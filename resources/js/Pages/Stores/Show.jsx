import dayjs from "dayjs";
import { Button } from "@/shadcn/ui/button";
import { Label } from "@/shadcn/ui/label";

const Show = ({ model, onDialogConfig }) => {
    return (
        <>
            <div className="flex space-x-10 mb-7 pt-3 w-full">
                <div className="space-y-6 w-2/3">
                    {/* Product Name */}
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Product Name</Label>

                        <div className="text-lg font-semibold">
                            {model.product_name}
                        </div>
                    </div>

                    {/* Product Quantity */}
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Product Quantity</Label>

                        <div className="text-lg font-semibold">
                            {model.product_quantity}
                        </div>
                    </div>

                    {/* Product Price */}
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Product Price</Label>

                        <div className="text-lg font-semibold">
                            ${model.product_price.toFixed(2)}
                        </div>
                    </div>
                </div>

                <div className="space-y-8 w-1/3">
                    {/* Date Created */}
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Date Created</Label>

                        <div className="text-lg font-semibold">
                            {dayjs(model.created_at).format("MMMM D, YYYY")}
                        </div>
                    </div>

                    {/* Created By */}
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Created By</Label>

                        <div className="text-lg font-semibold">
                            {model.created_by?.name || "Unknown User"}
                        </div>
                    </div>

                    {/* Date Updated */}
                    <div className="grid w-full max-w-sm gap-1.5">
                        <Label className="dark:text-slate-300">Date Updated</Label>

                        <div className="text-lg font-semibold">
                            {dayjs(model.updated_at).format("MMMM D, YYYY")}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <Button
                    className="bg-blue-600 hover:bg-blue-500 rounded-full w-40"
                    onClick={(e) =>
                        onDialogConfig({
                            open: true,
                            process: "update",
                            data: model,
                        })
                    }
                >
                    Update
                </Button>

                <Button
                    variant="secondary"
                    onClick={(e) =>
                        onDialogConfig({
                            open: false,
                            process: "",
                            data: null,
                        })
                    }
                    className="rounded-full w-40"
                >
                    Close
                </Button>
            </div>
        </>
    );
};

export default Show;
