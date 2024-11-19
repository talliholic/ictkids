export default function MblockCommand({ label = "Command", src }) {
    return (
        <div className="w-fit bg-slate-700 text-white px-4 pb-4">
            <h1 className="text-center p-1 font-bold uppercase">{label}</h1>
            <div className="flex justify-center">
                <img
                    className="h-28"
                    src={`/storage/mblock_commands/${src}.png`}
                    alt={src}
                />
            </div>
        </div>
    );
}
