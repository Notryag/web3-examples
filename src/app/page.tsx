import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello world
      <Link href={'/simple-wallet'}>simple wallet</Link>
    </main>
  )
}
