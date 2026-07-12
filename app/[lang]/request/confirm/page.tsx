import Link from 'next/link';
import { Layout } from '@/components/Public';
import type { Lang } from '@/content/site';

export default function Confirm({
  params,
  searchParams,
}: {
  params: { lang: Lang };
  searchParams: { id?: string };
}) {
  const isJa = params.lang === 'ja';
  const requestId = searchParams.id || '—';

  return (
    <Layout lang={params.lang}>
      <main className="section section-soft">
        <div className="container">
          <div className="card p-6 text-center md:p-10">
            <p className="eyebrow">Creotech Global Welcome</p>
            <h1 className="mt-3 text-4xl font-extrabold text-navy">
              {isJa ? 'お問い合わせを受け付けました' : 'Your enquiry has been received'}
            </h1>
            <p className="mt-5 text-lg text-slate-700">
              {isJa
                ? '入力内容をCreotech Global Welcome担当者へメールで送信しました。'
                : 'Your information has been emailed to the Creotech Global Welcome coordinator.'}
            </p>
            <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-line bg-white p-5">
              <span className="mini-label">Request ID</span>
              <p className="mt-3 text-2xl font-extrabold text-navy">{requestId}</p>
              <p className="mt-3 text-sm text-slate-600">
                {isJa
                  ? 'お問い合わせの際に、この受付番号をお知らせください。'
                  : 'Please quote this reference number in any follow-up message.'}
              </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-600">
              {isJa
                ? '担当者が内容を確認し、必要な手続きや次の行動をご連絡します。パスポートやCOE等の機微書類は、指定された安全な方法以外では送付しないでください。'
                : 'The coordinator will review the enquiry and contact you about the next action. Do not send passport, COE, or other sensitive documents unless a secure method is specifically provided.'}
            </p>
            <Link className="btn btn-primary mt-8" href={`/${params.lang}`}>
              {isJa ? 'ホームへ戻る' : 'Back to home'}
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
