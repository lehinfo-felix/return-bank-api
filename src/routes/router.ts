import { Router, Request, Response } from 'express'
import { validate } from '../middlewares/handleValidation'

import {
  createUser,
  deleteUser,
  getAllUsers,
  goToHome,
  login,
  updateUser,
} from '../controllers/prisma/userController'
import {
  createAccount,
  deleteAccount,
  getAccount,
  getAllAccounts,
  updateAccount
} from '../controllers/prisma/accountController'
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getAllTransactions,
} from '../controllers/prisma/transactionController'
import {
  createTransfer,
  deleteTransfer,
  getTransfer,
  getAllTransfers,
} from '../controllers/prisma/transferController'
import {
  createAgency,
  deleteAgency,
  getAgency,
  getAllAgencys,
  updateAgency,
} from '../controllers/prisma/agencyController'
import {
  createMachine,
  deleteMachine,
  getMachine,
  getAllMachines,
  updateMachine,
} from '../controllers/prisma/machineController'
import { userCreateValidator } from '../middlewares/validators/userValidator'
import { accountCreateValidator } from '../middlewares/validators/accountValidator'
import { transactionCreateValidator } from '../middlewares/validators/transactionValidator'
import { agencyCreateValidator } from '../middlewares/validators/agencyValidator'
import { machineCreateValidator } from '../middlewares/validators/machineValidator'
import { checkToken } from '../middlewares/checkToken'
import { getSalute } from '../lib/dayJs'

const router = Router()

export default router
  .get('/test', (req: Request, res: Response) => {
    res.status(200).json({ msg: 'API Working👨🏽‍🚀' })
  })

  .get('/salute', getSalute)

  /* User */
  .get('/getAllUsers', getAllUsers)
  .post('/user', userCreateValidator(), validate, createUser)

  .post('/auth/login', login)
  .get('/user/:id', checkToken, goToHome)

  .delete('/user/:id', deleteUser)
  .patch('/user/:id', updateUser)

  /* Account */
  .get('/account/:id', checkToken, getAccount)
  .get('/getAllAccounts', getAllAccounts)
  .post('/account', accountCreateValidator(), validate, createAccount)
  .delete('/account/:id', deleteAccount)

  /* Transaction */
  .get('/transaction/:id', getTransaction)
  .get('/getAllTransactions', getAllTransactions)
  .post(
    '/transaction',
    transactionCreateValidator(),
    validate,
    createTransaction,
    updateAccount
  )
  .delete('/transaction/:id', deleteTransaction)

  /* Transfer */
  .get('/transfer/:id', getTransfer)
  .get('/getAllTransfers', getAllTransfers)
  .post('/transfer', transactionCreateValidator(), validate, createTransfer)
  .delete('/transfer/:id', deleteTransfer)

  /* Agency */
  .get('/agency/:id', getAgency)
  .get('/getAllAgencys', getAllAgencys)
  .post('/agency', agencyCreateValidator(), validate, createAgency)
  .delete('/agency/:id', deleteAgency)
  .patch('/agency/:id', updateAgency)

  /* CashMachine */
  .get('/machine/:id', getMachine)
  .get('/getAllMachines', getAllMachines)
  .post('/machine', machineCreateValidator(), validate, createMachine)
  .delete('/machine/:id', deleteMachine)
  .patch('/machine/:id', updateMachine)
