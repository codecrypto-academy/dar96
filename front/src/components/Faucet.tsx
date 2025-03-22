import { UserContext } from "@/App"
import { useContext, useState } from "react"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


export function Faucet() {
    const { account, setAccount } = useContext(UserContext)
    const [tx, setTx] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const form = useForm()

    const onSubmit = async (e) => {
        setLoading(true)
        const res = await fetch(`http://localhost:3333/api/faucet/${e.to}/100`)
        const data = await res.json()
        setTx(JSON.stringify(data, null, 4))
        setLoading(false)

    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Destino</FormLabel>
                                <FormControl>
                                    <Input placeholder="0xdsk4" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Destino de los fondos.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <Button
                    type="submit"
                    >
                        <Loader2 className={loading? "mr-2 h-4 w-4 animate-spin" : 'hidden'} ></Loader2>
                        Solicitar Tokens</Button>
                </form>
            </Form>
            {tx && <pre> {tx} </pre>}
        </div>
    )
}