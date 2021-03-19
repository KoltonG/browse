import Link from 'next/link'

export default function Training() {
  return (
    <div className="container mx-auto min-h-screen flex items-center">
      <div>
        <h1 className="text-white">Move Around</h1>
        <div className="flex gap-5">
          <img src="/move.gif" alt="move" style={{ maxHeight: 338 }} />
          <div>
            <p className="text-white mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <Link href="/training/move">
              <button className="float-right">OK I'm ready</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
