import * as qna from "@tensorflow-models/qna"
import * as tf from "@tensorflow/tfjs";
import {FormEvent, useState} from "react";

function App() {
    const [loading, setLoading] = useState(false)
    const [answer, setAnswer] = useState("")
    const [question, setQuestion] = useState("Who is the CEO of Google?")
    const [passage, setPassage] = useState("Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook. Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet.")
    const getAnswer = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await tf.setBackend('webgl')
        const model = await qna.load()
        console.log(question)
        console.log(passage)
        const answers = await model.findAnswers(question, passage)
        console.log(answers);
        setLoading(false)
        if (answers.length === 0) return setAnswer("Sorry, cant find answer")
        setAnswer(answers[0].text)
    }
    return (
        <div className={"h-screen w-screen bg-neutral-900 text-neutral-200 flex justify-center items-center"}>
            <form
                onSubmit={getAnswer}
                className={"flex flex-col rounded-lg max-w-xl space-y-4 shadow-xl shadow-neutral-950/50 p-5 bg-neutral-800"}>
                <div className={"text-3xl text-center"}>Q&A</div>
                <label className={"flex flex-col"}>
                    <div className={"text-neutral-500"}>Question</div>
                    <input
                        className={"rounded-lg px-4 py-2 bg-neutral-900/80"}
                        onChange={(e) => setQuestion(e.target.value)}
                        value={question}
                    />
                </label>
                <label className={"flex flex-col"}>
                    <div className={"text-neutral-500"}>Passage</div>
                    <textarea
                        className={"rounded-lg p-4 bg-neutral-900/80 resize-none w-96 h-72"}
                        onChange={(e) => setPassage(e.target.value)}
                        value={passage}
                    />
                </label>
                <button
                    className={"px-4 py-2 rounded-lg bg-blue-700 shadow-lg shadow-blue-600/30 capitalize hover:bg-blue-800 duration-150"}
                    onClick={getAnswer}
                >
                    get answer
                </button>
            </form>
            <div className={"w-1/3 bg-neutral-800 rounded-lg min-h-[200px] ml-6 overflow-hidden shadow-xl shadow-neutral-950/50 "}>
                {loading
                    ? <div className={"text-center"}>Loading...</div>
                    : answer
                        ? <div>
                            <div className={"mb-5 text-xl text-center text-neutral-300 bg-neutral-950/70 py-3"}>Answer</div>
                            <div className={"px-5"}>{answer}</div>
                        </div>
                        : <div className={"text-center text-xl mt-4"}>Here will be answer</div>
                }
                <div className={"text-center text-xl"}></div>
            </div>
        </div>
    )
}

export default App
