const router = require("express").Router();
const upload = require("../middlewares/multer");
const apiController = require("../controllers/apiController");
const { isAuth } = require("../middlewares/isAuth");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     jwt:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Patients:
 *       type: object
 *       required:
 *         - fullName
 *         - age
 *         - gender
 *         - address
 *         - diagnosis
 *       properties:
 *         _id:
 *           type: string
 *           description: The Auto-generated id of a patients
 *         fullName:
 *           type: string
 *           description: fullname of patients
 *         age:
 *           type: integer
 *           description: age of patients
 *         gender:
 *           type: string
 *           enum: [M, F]
 *           description: M for male & F for female
 *         address:
 *           type: string
 *           descripton: address of patients
 *         diagnosis:
 *            type: object
 *            description: nested object of diagnosis
 *            properties:
 *               diagnosisDescription:
 *                 type: string
 *                 description: description of diagnosis
 *               diagnosisTime:
 *                 type: string
 *                 format: date
 *                 description: time milliseconds since January 1, 1970 UTC
 *               diagnosisImageUrl:
 *                 type: string
 *                 description: url blob image of diagnosis
 *         createdAt:
 *            type: string
 *            description: Auto-generated from timestamp
 *         updatedAt:
 *             type: string
 *             description: Auto-generated from timestamp
 *
 *       example:
 *         _id: "619b7109f2e3b309460b0c3d"
 *         fullName: "Vladímir Vladímirovich Pútin"
 *         age: 69
 *         gender: M
 *         address : "Putins Palace, Gelendzhik Urban Okrug, Krasnodar Krai"
 *         diagnosis:
 *           diagnosisDescription: "Abnormal Syndrom"
 *           diagnosisTime: "1970-01-01T06:08:32.021Z"
 *           diagnosisImageUrl: "https://stmarisehat1.blob.core.windows.net/marisehat/1637576968268-5-layer-diagram.png-Ini%20Test%20Pasien%201?se=2021-11-22T11%3A29%3A28Z&sp=r&sv=2018-03-28&sr=b&sig=28joaCrAUSZaPmkqbZ6WMLVXrHkPNhafDyZQKaXexBM%3D"
 *         createdAt: "2021-11-26T08:32:51.855Z"
 *         updatedAt: "2021-11-26T08:32:51.855Z"
 *
 *
 *     Users:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated id of a users
 *         email:
 *           type: string
 *           description: email of users
 *         password:
 *           type: integer
 *           description: hashed password of users
 *         createdAt:
 *           type: string
 *           description: Auto-generated from timestamp
 *         updatedAt:
 *           type: string
 *           description: Auto-generated from timestamp
 *
 *       example:
 *         _id: "619e4cad26ac7f2929184c1b"
 *         email: "youremail@example.com"
 *         password: "32b2312312$ggPl8w2us423nAXgOkgIweDm27oY423/9v2CN6U1rsYRKy1o5F423P9"
 *         createdAt: "2021-11-26T08:32:51.855Z"
 *         updatedAt: "2021-11-26T08:32:51.855Z"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 */

/**
 * @swagger
 * paths:
 *   /auth/signup:
 *     post:
 *       summary: Returns result of users signup
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: youremail@emailprovider.com
 *                 password:
 *                   type: string
 *                   example: yourpasswordhere
 *
 *       responses:
 *         200:
 *           description: Data of the Users
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Users'
 *
 *         422:
 *          description: Incorrect input of user email
 *         401:
 *          description: Email already registered
 *
 */

/**
 * @swagger
 * paths:
 *   /auth/signin:
 *     post:
 *       summary: Returns result of users signin
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: youremail@emailprovider.com
 *                 password:
 *                   type: string
 *                   example: yourpasswordhere
 *
 *       responses:
 *         200:
 *           description: Data of the Users
 *           content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    token:
 *                      type: string
 *                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Rjb2JhY29iYUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2MTllNWI1Nzc4N2UzNjljZTI2ZTE3ZjIiLCJpYXQiOjE2Mzc5MDAwODcsImV4cCI6MTYzNzkwMzY4N30.437A4rLV2B68wMbgU1EE0eZZL1PyvkZbUhxNW6D_2QE
 *                    userId:
 *                      type: string
 *                      example: 619b7109f2e3b309460b0c3d
 *
 *         422:
 *          description: Incorrect input of user either email or password
 *         401:
 *          description: Invalid Email
 *
 */

/**
 * @swagger
 * tags:
 *   name: Patients
 */

/**
 * @swagger
 * paths:
 *   /api/marisehat/patients:
 *     get:
 *       summary: Returns list of patients
 *       tags: [Patients]
 *       security:
 *       - jwt: []
 *       responses:
 *         200:
 *           description: List of the Patients
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Patients'
 *
 *         401:
 *          description: User not authenticated
 *
 *     post:
 *       summary: Returns uploaded data of patients
 *       tags: [Patients]
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                   example: Putin
 *                 age:
 *                   type: number
 *                   example: 99
 *                 gender:
 *                   type: string
 *                   example: M
 *                 address:
 *                   type: string
 *                   example: Putins Palace
 *                 diagnosisDescription:
 *                   type: string
 *                   example: Abnormal Syndrom
 *                 diagnosisTime:
 *                   type: string
 *                   format: date
 *                   example: 1970-01-01T06:08:32.021Z
 *                 diagnosisImageUrl:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: binary
 *       security:
 *         - jwt: []
 *       responses:
 *         200:
 *           description: Data of the Patients
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Patients'
 *
 *         401:
 *          description: User not authenticated
 *
 */

/**
 * @swagger
 * paths:
 *   /api/marisehat/patients/edit/{id}:
 *      put:
 *       summary: Returns edited data of patients by id
 *       tags: [Patients]
 *       parameters:
 *         - name: id
 *           in: path
 *           schema:
 *             type: string
 *           required: true
 *           description: the id of patients
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                   example: Putin
 *                 age:
 *                   type: number
 *                   example: 99
 *                 gender:
 *                   type: string
 *                   example: M
 *                 address:
 *                   type: string
 *                   example: Putins Palace
 *                 diagnosisDescription:
 *                   type: string
 *                   example: Abnormal Syndrom
 *                 diagnosisTime:
 *                   type: string
 *                   format: date
 *                   example: 1970-01-01T06:08:32.021Z
 *                 diagnosisImageUrl:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: binary
 *       security:
 *         - jwt: []
 *       responses:
 *         200:
 *           description: Data of the Patients
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Patients'
 *
 *         401:
 *          description: User not authenticated
 *
 */

/**
 * @swagger
 * paths:
 *   /api/marisehat/patients/{id}:
 *      get:
 *        summary: Return a patients by id
 *        tags: [Patients]
 *        parameters:
 *         - name: id
 *           in: path
 *           schema:
 *             type: string
 *           required: true
 *           description: the id of patients
 *        security:
 *        - jwt: []
 *        responses:
 *          200:
 *            description: Show a patients
 *            content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Patients'
 *
 *          401:
 *            description: User not authenticated
 *
 *      delete:
 *        summary: Delete a patients by id
 *        tags: [Patients]
 *        parameters:
 *         - name: id
 *           in: path
 *           schema:
 *             type: string
 *           required: true
 *           description: the id of patients
 *        security:
 *        - jwt: []
 *        responses:
 *          200:
 *            description: Delete a patients
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Patients Data has been deleted
 *
 *          401:
 *            description: User not authenticated
 *
 */

router.get("/patients", isAuth, apiController.listPatients);
router.get("/patients/:id", isAuth, apiController.showPatients);
router.post("/patients", isAuth, upload.any(), apiController.createPatients);
router.put("/patients/edit/:id", isAuth, upload.any(), apiController.updatePatients);
router.delete("/patients/:id", isAuth, apiController.deletePatients);

module.exports = router;
