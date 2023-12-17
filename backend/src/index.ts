import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { dev } from './config';
import { errorHandler } from './middlewares/errorHandler';
import productRouter from './routes/productRoutes';
import { connectDB } from './config/db';
import { createHttpError } from './util/createHTTPError';
import categoryRouter from './routes/categoryRoute';
import userRouter from './routes/userRoute';
import authRouter from './routes/authRoute';
import orderRouter from './routes/orderRoute';

const app: Application = express();

const port: number = dev.app.port;

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
  connectDB();
});

app.get('/', (req, res) => {
  res.json({ message: 'health cheakup' });
});

app.use(cors());
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );
app.use('/public', express.static('public'));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/orders', orderRouter);

app.use((req, res, next) => {
  const error = createHttpError(404, 'route not found');
  next(error);
});

app.use(errorHandler);

/**
 * 1. GET: /users -> get all the users
 * create route
 * create controller: getAllUsers(),
 * create service: getUsers()
 * validate request body inputs
 * including pagination
 * Sorting (-1 for descending, 1 for ascending)
 * searching with $regex - create RegEx() then filter with that RegEx()
 * skipping property such as password from the ouput documents {propertyName: 0}
 */

/**
 * 2. GET: /users/:id -> get a single user by id,
 * create route,
 * create controller: getUser(),
 * create service: findUserById() - handle errors: user not found, mongoose id cast error
 */

// 3. POST     /api/users/process-registration -> process user registration (filter the image)
// 4. POST     /api/users/activate -> activate the user

// 5. PUT:     /users/ban-user/:id -> ban user by id
// 6. PUT:     /users/unban-user/:id -> unban user by id
//  DELETE:  /users/:id -> delete a single user by id
// ! PUT:     /users/:id -> update a single user by id
// forget and reset password

// JWT authentication
// POST    /auth/login -> login the user
// POST    /auth/logout -> logout the user
// middlewares: isAdmin, isLoggedIn, isLoggedOut
// reset password
// forget password
// update password

// Products API
//  GET:     /products -> get all the products including pagination, sorting and search
//  GET:     /products/:id -> get single product by id
//  GET:     /products/:slug -> get single product by slug
// DELETE : /products/:slug -> delete a single product by slug
// PUT : /products/:slug -> update a single product by slug
// POST : /products -> create a new product

// Category API
// GET : /categories -> return all categories
// GET : /categories/:id -> return single category by id
// POST : /categories -> create a new category

// Order API
