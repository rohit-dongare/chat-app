

const Conversation = () => {
  return (
    <>
        <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
            {/* class online/offline indicates that whether the user is online or offline , we will change these based on the user if he/she if is online or offline*/}
            {/* these classes are built classes in daisy ui */}
            <div className="avatar online">
                <div className="w-12 rounde-full">
                    <img src="https://avatar.iran.liara.run/public/girl?username=Jennie" alt="user avatar" />
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className="font-bold text-gray-200">John Doe</p>
                    <span className="text-xl">🎃</span>
                </div>
            </div>
        </div>
        <div className="divider my-0 py-0 h-1"></div>
    </>
  )
}

export default Conversation