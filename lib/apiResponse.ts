import {NextResponse} from "next/server";
import {ApiNotification} from "@/types/api";


export class ApiResponse {
    static success(data?: unknown, notification?: ApiNotification, status = 200) {
        return NextResponse.json(
            {
                response: {
                    data,
                    notification,
                },
            },
            {status}
        );
    }

    static error(notification: ApiNotification, status = 400) {
        return NextResponse.json(
            {
                response: {
                    notification,
                },
            },
            {status}
        );
    }

    static validation(errors: Record<string, string>, notification?: ApiNotification) {
        return NextResponse.json(
            {
                response: {
                    data: errors,
                    notification,
                },
            },
            {status: 422}
        );
    }
}