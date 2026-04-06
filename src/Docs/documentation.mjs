/**
 * @swagger
 * tags:
 *   - name: Auth
 *   - name: Users
 *   - name: Finance
 *   - name: Dashboard
 */

/**
 * =========================
 * AUTH
 * =========================
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, role]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 15
 *                 example: password123
 *               role:
 *                 type: string
 *                 example: USER
 *     responses:
 *       201:
 *         description: User registered
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: iamgiridharanks@gmail.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 15
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Login success
 */

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout success
 */

/**
 * =========================
 * USERS
 * =========================
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users with pagination and filters
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of users per page
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 *         description: Filter users by status
 *
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [ADMIN, USER,ANALYST]
 *         description: Filter users by role
 *
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Current user data
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 */

/**
 * @swagger
 * /api/users/me/email:
 *   patch:
 *     summary: Update email
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [newEmail]
 *             properties:
 *               newEmail:
 *                 type: string
 *                 example: new@gmail.com
 *     responses:
 *       200:
 *         description: Email updated
 */

/**
 * @swagger
 * /api/users/me/status:
 *   patch:
 *     summary: toggle to make status active or in-active
 *     tags: [Users]
 *
 *     responses:
 *       200:
 *         description: Status updated
 */

/**
 * @swagger
 * /api/users/me/password:
 *   patch:
 *     summary: Update password
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword]
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 15
 *               newPassword:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 15
 *     responses:
 *       200:
 *         description: Password updated
 */

/**
 * @swagger
 * /api/users/{id}/role:
 *   patch:
 *     summary: Update user role
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [newRole]
 *             properties:
 *               newRole:
 *                 type: string
 *                 example: ADMIN
 *     responses:
 *       200:
 *         description: Role updated
 */

/**
 * @swagger
 * /api/users/me/delete:
 *   delete:
 *     summary: Delete own account
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User deleted
 */

/**
 * =========================
 * FINANCE
 * =========================
 */

/**
 * @swagger
 * /api/users/me/finances:
 *   post:
 *     summary: Create finance record
 *     tags: [Finance]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, RecordType, Category]
 *             properties:
 *               amount:
 *                 type: integer
 *                 minimum: 1
 *                 example: 500
 *               currency:
 *                 type: string
 *                 example: INR
 *               RecordType:
 *                 type: string
 *                 example: EXPENSE
 *               Category:
 *                 type: string
 *                 example: Food
 *               description:
 *                 type: string
 *                 maxLength: 350
 *     responses:
 *       201:
 *         description: Finance created
 */

/**
 * @swagger
 * /api/users/me/finances:
 *   get:
 *     summary: Get finances (pagination + filtering)
 *     tags: [Finance]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 3
 *         description: Number of records per page
 *
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [food, transport, other]
 *         description: Filter by expense category
 *
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [EXPENSE, INCOME]
 *         description: Filter by finance type
 *
 *       - in: query
 *         name: currency
 *         schema:
 *           type: string
 *           enum: [INR]
 *         description: Filter by currency
 *
 *     responses:
 *       200:
 *         description: Finance list
 */
/**
 * @swagger
 * /api/users/me/finances/{id}/amount:
 *   patch:
 *     summary: Update amount
 *     tags: [Finance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newAmount:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Amount updated
 */

/**
 * @swagger
 * /api/users/me/finances/{id}/recordtype:
 *   patch:
 *     summary: Update record type
 *     tags: [Finance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newRecordType:
 *                 type: string
 *                 example: INCOME
 *     responses:
 *       200:
 *         description: Record type updated
 */

/**
 * @swagger
 * /api/users/me/finances/{id}/category:
 *   patch:
 *     summary: Update category
 *     tags: [Finance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newCategory:
 *                 type: string
 *                 example: Transport
 *     responses:
 *       200:
 *         description: Category updated
 */

/**
 * @swagger
 * /api/users/me/finances/{id}/desc:
 *   patch:
 *     summary: Update description
 *     tags: [Finance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newDesc:
 *                 type: string
 *                 maxLength: 350
 *     responses:
 *       200:
 *         description: Description updated
 */

/**
 * @swagger
 * /api/users/me/finances/{id}:
 *   delete:
 *     summary: Delete finance record
 *     tags: [Finance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted
 */

/**
 * =========================
 * DASHBOARD
 * =========================
 */

/**
 * @swagger
 * /api/users/{id}/dashboard:
 *   get:
 *     summary: Get user dashboard
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Dashboard data
 */

/**
 * @swagger
 * /api/users/dashboard:
 *   get:
 *     summary: Get system dashboard
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: System analytics
 */