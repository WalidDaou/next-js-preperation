import {ApiResponse} from "@/lib/apiResponse";
import {apiNotification} from "@/lib/apiNotification";

export async function GET() {
    return ApiResponse.success({success: true}, apiNotification().success("test test", "Test test"))
}