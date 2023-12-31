'use client'

import { formatEther, parseEther } from "ethers"
import { BrowserProvider } from "ethers"
import { ethers } from "ethers"
import { useState } from "react"
import { Button, Field, Toast } from "react-vant"




function Wallet() {
    const [provider, setProvider] = useState<BrowserProvider | null>(null)
    const [account, setAccount] = useState('')
    const [balance, setBalance] = useState('0')
    const [network, setNetwork] = useState('')
    
    const [to, setTo] = useState<string>('')
    const [amount, setAmount] = useState<string>('')

    async function connectToMetaMask() {
        console.log(123, '123');


        if (window.ethereum == null) {

            console.log("MetaMask not installed; using read-only defaults")

        } else {
            let provider = new ethers.BrowserProvider(window.ethereum)
            const accounts = await provider.send('eth_requestAccounts', [])
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            const network = await provider.getNetwork()
            
            const balance = await provider.getBalance(address)
            setProvider(provider)
            setAccount(address)
            setBalance(formatEther(balance))
            setNetwork(network.name)
        }
    }
    const formatAddress = (address: string) => {
        if (!address) return '登录中...'
        return `${address.slice(0, 12)}.....${address.slice(-12)}`;
    };

    async function transfer() {
        if (!account) {
            Toast.fail('请先登录')
        }
        if (!to || !amount) {
            Toast.fail('请填写完整')
        }
        try {
            Toast.loading({
                message: '发送中...',
                forbidClick: true,
                duration: 0
            })
            const value = parseEther(amount.toString())
            const signer = await provider?.getSigner()
            const tx = await signer?.sendTransaction({
                to: to,
                value
            })
            await tx?.wait()
            const balance = await provider?.getBalance(account)
            setBalance(formatEther(balance!))
        } catch (error) {
            console.log(error);
        } finally {
            Toast.clear()
        }
    }

    return (
        <div className="h-screen">
            {
                <div className="header px-4 py-10 h-1/2 w-full overflow-hidden bg-teal-500 text-white ">
                    {
                        provider ? (
                            <>
                                <div>{formatAddress(account)}</div>
                                <div className="my-4">network {network}</div>
                                <div className="my-4">余额: {balance} ETH</div>
                            </>
                        ) : <Button onClick={connectToMetaMask}>Connect to MetaMask</Button>
                    }
                </div>

            }
            <div className="container fixed h-3/4 bottom-0 rounded-xl bg-white">
                <div className="mt-2">
                    <Field value={to} onChange={setTo} label="address" placeholder="address"></Field>
                    <Field value={amount} onChange={setAmount} label="amount" placeholder="amount"></Field>
                    <div className="mt-4">
                        <Button onClick={transfer} round block type="primary">Send</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet