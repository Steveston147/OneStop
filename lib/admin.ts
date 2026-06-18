import { cookies } from 'next/headers';import crypto from 'crypto';
export function adminReady(){return Boolean(process.env.ADMIN_PASSWORD)}
function token(){return crypto.createHash('sha256').update(process.env.ADMIN_PASSWORD||'').digest('hex')}
export async function isAdmin(){return (await cookies()).get('admin_session')?.value===token() && adminReady()}
export async function login(pw:string){if(!adminReady())return false;if(pw!==process.env.ADMIN_PASSWORD)return false;(await cookies()).set('admin_session',token(),{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:60*60*8});return true}
export async function logout(){(await cookies()).delete('admin_session')}
