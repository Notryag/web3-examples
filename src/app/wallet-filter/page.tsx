'use client'

import { HDNodeWallet } from "ethers";
import { Wallet } from "ethers";
import { useState } from "react"
import { Button, Field, Typography } from "react-vant"

export default function WalletFilter() {
    const [loading, setLoading] = useState(false)
    const [startChar, setStartChar] = useState<string>("");
    const [includeChar, setIncludeChar] = useState<string>("");
    const [endChar, setEndChar] = useState<string>("");
    const [wallets, setWallets] = useState<HDNodeWallet | null>(null);

    const generate = () => {
        let _wallet: HDNodeWallet | null = null;
        setLoading(true);
        setWallets(null);
        setTimeout(() => {
            const match = new RegExp(`^0x${startChar}.*${includeChar}.*${endChar}$`);

            while (true) {
                const wallet = Wallet.createRandom();
                if (match.test(wallet.address)) {
                    _wallet = wallet;
                    break;
                }
            }
            console.log(_wallet, '_wallet')
            setWallets(_wallet);
            setLoading(false);
        }, 300);
    };
    return (
        <div className="m-2 h-screen w-full overflow-hidden">
            <div className="">
                <Field
                    value={startChar}
                    onChange={setStartChar}
                    label="开头号码"
                    placeholder="开头号码"
                />
                <Field
                    value={includeChar}
                    onChange={setIncludeChar}
                    label="包含号码"
                    placeholder="包含号码"
                />
                <Field
                    value={endChar}
                    onChange={setEndChar}
                    label="结尾号码"
                    placeholder="结尾号码"
                />
                <Button onClick={generate} type="primary" loading={loading} round block>生成钱包</Button>
            </div>
            <div>
                {wallets && <div>
                    <p className="break-words">地址：{wallets.address}</p>
                    <p className="break-words">私钥：{wallets.privateKey}</p>
                </div>}
            </div>
        </div>
    )
}