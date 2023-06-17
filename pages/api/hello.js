// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
export const ApiGet = async () => {
  const res = await fetch("http://127.0.0.1:8000/admin/app/product/")
  const data = await res.json()
  console.log(data)
}