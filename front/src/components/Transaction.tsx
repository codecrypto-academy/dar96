import { UserContext } from "@/App"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
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

export function Transaction() {
    const { account, setAccount } = useContext(UserContext)
    const [tx, setTx] = useState(null)
    const [loading, setLoading] = useState(false)


    const form = useForm()

    const ethereum = (window as any).ethereum


    const onSubmit = async (data:any) => {
        setLoading(true)

        const res = await ethereum.request({method: 'eth_sendTransaction',
            params: [
                {
                    from: data.from,
                    to: data.to,
                    value: "0x" + (data.amount * 1e18).toString(16)
                }

            ]
        })
        setTx(res)
        setLoading(false)

    }
    return (
        <div className="space-y-4 mt-4" >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Origen</FormLabel>
                                <FormControl>
                                    <Input placeholder="0xdsk4" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Origen de la transacción.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destino</FormLabel>
                                <FormControl>
                                    <Input placeholder="0xdsk4" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Destino de la transacción.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cantidad</FormLabel>
                                <FormControl>
                                    <Input placeholder="0.001" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Cantidad a transferir.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                    <Loader2 className={loading? "mr-2 h-4 w-4 animate-spin" : 'hidden'} ></Loader2>
                        Transferir</Button>
                </form>
            </Form>
            {tx && <pre> {JSON.stringify(tx, null, 4)} </pre>}
        </div>
    )
}