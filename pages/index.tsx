import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  function handleClick() {
    window.handsfree.plugin.palmPointers.enable()
    window.handsfree.plugin.pinchScroll.enable()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Browse | Handsfree Experimentation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <button onClick={handleClick}>Enable Gestures</button>
        <h1 className="text-6xl font-bold text-white">Welcome to Browse</h1>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full gap-4">
          <Link href="/training">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 text-white">
              <h3 className="text-2xl font-bold">Training</h3>
            </a>
          </Link>

          <Link href="/test1/groceries">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600 text-white">
              <h3 className="text-2xl font-bold">Groceries</h3>
            </a>
          </Link>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}
