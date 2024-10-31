import authService from "@/services/auth/auth.service";
import { NextResponse } from "next/server";

export async function GET(request: Request){

    console.log('request Route GET: ', request);
    
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key') ?? ''
    const value = await authService.getRedisValue(key)

    return NextResponse.json({value: value});
    
}