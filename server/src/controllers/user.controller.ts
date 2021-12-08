import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import HttpException from '../utils/httpException.utils';
import userModel from '../models/users.model';
import {
    default as IUser,
    IGetUserAuthInfoRequest,
} from '../interfaces/user.interface';

dotenv.config();

const getUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await userModel.read(req.query);

    users.length
        ? res.status(200).send(users)
        : res.status(204).send({
              error: {
                  code: 'errorNoResults',
                  message: 'No content',
              },
          });
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const user: IUser = await userModel.find({ id });

    user.length
        ? res.status(200).send(user)
        : res.status(204).send({
              error: {
                  code: 'errorNoResults',
                  message: 'Failed to find a user with the specific ID',
              },
          });
};

const getUserByName = async (req: Request, res: Response): Promise<void> => {
    const name: string = req.params.name;
    const user: IUser = await userModel.find({ name });

    user
        ? res.status(200).send(user)
        : res.status(204).send({
              error: {
                  code: 'errorNoResults',
                  message: 'Failed to find a user with the specific name',
              },
          });
};

const getCurrentUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { password_digest, ...userWithoutPassword } = req.currentUser;

    res.send(userWithoutPassword);
};

const addUser = async (req: Request, res: Response): Promise<void> => {
    checkValidation(req, res);
    hashPassword(req);

    const data: IUser = req.body;
    const result = await userModel.create(data);

    result
        ? res.status(201).send({ message: 'Added new user' })
        : res.status(304).send({
              error: {
                  code: 'errorNotAdded',
                  message: 'Failed to add new user',
              },
          });
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
    checkValidation(req, res);

    const id: string = req.params.id;
    const data: IUser = req.body;
    const { affectedRows, changedRows, info } = await userModel.update(
        id,
        data
    );

    !affectedRows
        ? res.status(404).send({ message: 'User not found', info })
        : affectedRows && changedRows
        ? res.status(200).send({ message: 'User updated successfully', info })
        : res.status(304).send({ message: 'User not modified', info });
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const result = await userModel.delete(id);
    result
        ? res.status(200).send({ message: 'User has been deleted' })
        : res.status(304).send({
              error: {
                  code: 'errorNotDeleted',
                  message: 'User not deleted',
              },
          });
};

const userLogin = async (req: Request, res: Response) => {
    checkValidation(req, res);
    const { email, password, remember } = req.body;
    const user = await userModel.find({ email });

    !user &&
        res.status(401).send({
            error: {
                code: 'errorInvalidCredentials',
                message: 'Invalid email or username',
            },
        });

    const isMatch = await bcrypt.compare(password, user.password_digest);

    !isMatch &&
        res.status(401).send({
            error: {
                code: 'errorInvalidCredentials',
                message: 'Incorrect password',
            },
        });

    const secret = process.env.SECRET_JWT || '';
    const token = jwt.sign({ userId: user.id.toString() }, secret, {
        expiresIn: remember ? '7d' : '24h',
    });

    const { password_digest, ...userWithoutPassword } = user;
    res.send({ user: { ...userWithoutPassword, token } });
};

const checkValidation = (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({
            code: 'errorValidationFailed',
            errors: errors.array(),
        });
    }
};

const hashPassword = async (req: Request) => {
    const { password } = req.body.password;
    if (password) req.body.password = await bcrypt.hash(password, 8);
};

export default {
    getUsers,
    getUserById,
    getUserByName,
    getCurrentUser,
    addUser,
    updateUser,
    deleteUser,
    userLogin,
};
