import { Request, Response, NextFunction } from 'express'
import { prisma } from '../../lib/prisma'

export async function getAccount(req: Request, res: Response) {
  const data = req.params.id
  try {
    const account = await prisma.account.findMany({
      where: { id: data },
    })
    if (!account) {
      return res.status(404).json({ error: 'account not found' })
    }
    return res.status(200).json(account)
  } catch (e: any) {
    console.log(`Error: ${e.message}`)
  }
}

export async function getAllAccounts(req: Request, res: Response) {
  const data = req.params.id
  try {
    const account = await prisma.account.findMany()
    if (!account) {
      return res.status(404).json({ error: 'Dont have accounts' })
    }
    return res.status(200).json(account)
  } catch (e: any) {
    console.log(`Error: ${e.message}`)
  }
}

export async function createAccount(req: Request, res: Response) {
  const data = req.body
  try {
    const account = await prisma.account.create({
      data: {
        type: data.type,
        owner: data.owner,
        cash: 0,
        userId: data.userId,
      },
    })

    return res.status(200).json(account)
  } catch (e: any) {
    console.log(`Error: ${e.message}`)
  }
}

export async function deleteAccount(req: Request, res: Response) {
  const data = req.params.id
  try {
    const account = await prisma.account.delete({
      where: { id: data },
    })
    return res.status(200).json(account)
  } catch (e: any) {
    console.log(`Error: ${e.message}`)
  }
}

export async function updateAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const {cash, accountId, type} = req.body
    const account = await prisma.account.findUnique({
      where: { id: accountId  },
    })

    if(!account)  return res.status(500).json("Conta não existente")

    if(account?.cash < cash)
      return res.status(200).json("Saldo insuficiente")

    const isTransfer = type === 'transferencia' ? true : false

    await prisma.account.update({
      where: { id: accountId  },
       data: {
         cash: Number(account?.cash) + cash
        }
    })

    return res.status(200).json("Saque realizado")
  } catch (e: any) {
    console.log("111")
    console.log(`Error: ${e.message}`)
  }
}
