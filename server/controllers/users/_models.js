

/**
 * @swagger
 * definition:
 * 
 *   user:
 *     properties:
 *       _id:
 *         type: string
 *       name:
 *         type: string
 * 
 *   userDetailed:
 *     properties:
 *       _id:
 *         type: string
 *       name:
 *         type: string
 *       books:
 *         type: object
 *         properties:
 *           past:
 *             type: array
 *             items:
 *               type: object
 *               $ref: '#/definitions/bookScore'
 *           present:
 *             type: array
 *             items:
 *               type: object
 *               $ref: '#/definitions/book'
 * 
 */