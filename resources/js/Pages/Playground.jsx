import MblockCommand from "@/MblockCommands/Command";

export default function PlayGround() {
    return (
        <div>
            <h1 className="text-3xl text-center mb-8 bg-blue-900 text-white p-2">
                Playground
            </h1>
            <div className="flex gap-4">
                <MblockCommand
                    src="start_conversation"
                    label="Start a conversation"
                />
                <MblockCommand
                    src="start_conversation_and_send_message"
                    label="Start a conversation and send a message"
                />
            </div>
        </div>
    );
}
