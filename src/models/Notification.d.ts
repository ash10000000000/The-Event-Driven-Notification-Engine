import mongoose from 'mongoose';
export declare const Notification: mongoose.Model<{
    jobId: string;
    status: "PENDING" | "SUCCESS" | "FAILED";
    createdAt: NativeDate;
    type?: string | null;
    recipient?: string | null;
    error?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    jobId: string;
    status: "PENDING" | "SUCCESS" | "FAILED";
    createdAt: NativeDate;
    type?: string | null;
    recipient?: string | null;
    error?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    jobId: string;
    status: "PENDING" | "SUCCESS" | "FAILED";
    createdAt: NativeDate;
    type?: string | null;
    recipient?: string | null;
    error?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    jobId: string;
    status: "PENDING" | "SUCCESS" | "FAILED";
    createdAt: NativeDate;
    type?: string | null;
    recipient?: string | null;
    error?: string | null;
}, mongoose.Document<unknown, {}, {
    jobId: string;
    status: "PENDING" | "SUCCESS" | "FAILED";
    createdAt: NativeDate;
    type?: string | null;
    recipient?: string | null;
    error?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    jobId: string;
    status: "PENDING" | "SUCCESS" | "FAILED";
    createdAt: NativeDate;
    type?: string | null;
    recipient?: string | null;
    error?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        jobId: string;
        status: "PENDING" | "SUCCESS" | "FAILED";
        createdAt: NativeDate;
        type?: string | null;
        recipient?: string | null;
        error?: string | null;
    }, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<{
        jobId: string;
        status: "PENDING" | "SUCCESS" | "FAILED";
        createdAt: NativeDate;
        type?: string | null;
        recipient?: string | null;
        error?: string | null;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    jobId: string;
    status: "PENDING" | "SUCCESS" | "FAILED";
    createdAt: NativeDate;
    type?: string | null;
    recipient?: string | null;
    error?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    jobId: string;
    status: "PENDING" | "SUCCESS" | "FAILED";
    createdAt: NativeDate;
    type?: string | null;
    recipient?: string | null;
    error?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Notification.d.ts.map