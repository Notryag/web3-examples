'use client'
import { ethers } from "ethers"
import { useState } from "react"
import { Button, Field, Loading } from "react-vant"

export default function WalletGeneratorPage() {
    const [Loading, setLoading] = useState(false)
    const [walletNum, setWalletNum] = useState('1')
    const [wallets, setWallets] = useState<ethers.HDNodeWallet[]>([])

    const generateWallet = () => {
        setLoading(true)
        setTimeout(async () => {
            const wallets: ethers.HDNodeWallet[] = []
            for (let i = 0; i < +walletNum; i++) {
                let wallet = await ethers.Wallet.createRandom()
                wallets.push(wallet)
            }
            setWallets(wallets)
            setLoading(false)
        }, 100)

    }

    return (
        <div className="h-screen w-full overflow-hidden px-2 py-1 flex flex-col">
            <h1 className="h-10 p-4 text-lg">钱包地址生成器</h1>
            <Field className="my-2 h-24" type="digit" label="生成数量" value={walletNum} onChange={setWalletNum}></Field>
            <div className=" w-full bottom-2 px-6 my-5">
                <Button onClick={generateWallet} className="fixed!important bottom-0" loading={Loading} round block type='info'>生成钱包地址</Button>
            </div>
            <div className="divided-y overflow-auto ">
                {
                    wallets.map((wallet, index) => {
                        return (
                            <div key={index} className="p-4 mb-4 ">
                                <h2 className="text-lg">钱包{index + 1}</h2>
                                <p className="break-words overflow-hidden">地址：{wallet.address}</p>
                                <p className="break-words">私钥：{wallet.privateKey}</p>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}