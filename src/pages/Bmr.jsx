import { useState } from "react"
import bmr from "./../assets/bmr.png"
import { Link } from "react-router"
import Footer from "./../components/Footer"

export default function Bmr() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("male")
  const [bmrResult, setBmrResult] = useState("0.00")

  // ฟังก์ชันคำนวณ BMR (สูตร Harris-Benedict)
  const handleCalculate = () => {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    const a = parseFloat(age)

    if (!w || !h || !a || w <= 0 || h <= 0 || a <= 0) {
      alert("กรุณาป้อนน้ำหนัก ส่วนสูง และอายุให้ครบถ้วนและถูกต้อง")
      return
    }

    let result = 0
    if (gender === "male") {
      result = 66 + (13.7 * w) + (5 * h) - (6.8 * a)
    } else {
      result = 655 + (9.6 * w) + (1.8 * h) - (4.7 * a)
    }

    setBmrResult(result.toFixed(2))
  }

  // ฟังก์ชันยกเลิก / ล้างข้อมูล
  const handleReset = () => {
    setWeight("")
    setHeight("")
    setAge("")
    setGender("male")
    setBmrResult("0.00")
  }

  return (
    <>
      <div className="w-full max-w-md bg-white border border-gray-100 shadow-[0_0_25px_rgba(0,0,0,0.08)]
                      mt-12 rounded-2xl mx-auto flex flex-col items-center p-8">
        {/* แสดงชื่อการคำนวณภาษาไทย-อังกฤษ */}
        <div className="flex flex-col items-center gap-1 mb-4">
          <p className="font-kanit font-bold text-2xl text-gray-800">BMR Calculator</p>
          <p className="font-itim text-sm text-gray-500">คำนวณ BMR</p>
        </div>

        {/* แสดงรูป */}
        <div className="my-2">
          <img src={bmr} alt="รูป" className="w-20" />
        </div>

        {/* แสดงส่วนของ form เพื่อให้ผู้ใช้ป้อนหรือเลือกหรือคลิก */}
        <div className="w-full mt-2">
          <form className="flex flex-col">
            <label className="font-kanit font-bold text-xs text-gray-700 mb-1">
              ป้อนน้ำหนัก (กิโลกรัม)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

            <label className="font-kanit font-bold text-xs text-gray-700 mt-3 mb-1">
              ป้อนส่วนสูง (เซนติเมตร)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

            <label className="font-kanit font-bold text-xs text-gray-700 mt-3 mb-1">
              ป้อนอายุ (ปี)
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

            <label className="font-kanit font-bold text-xs text-gray-700 mt-3 mb-1">
              เลือกเพศ
            </label>
            <div className="flex gap-4 text-sm font-kanit text-gray-700">
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="accent-purple-800 cursor-pointer"
                />
                <span>ชาย</span>
              </label>

              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="accent-purple-800 cursor-pointer"
                />
                <span>หญิง</span>
              </label>
            </div>

            <div className="flex mt-5 gap-3">
              <button
                type="button"
                onClick={handleCalculate}
                className="bg-purple-800 hover:bg-purple-900 text-white py-2 rounded-md w-full
                           font-kanit text-sm transition cursor-pointer"
              >
                คำนวณ
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-md w-full
                           font-kanit text-sm transition cursor-pointer"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>

        {/* แสดงผลลัพธ์ */}
        <div className="w-full mt-5 flex gap-2 justify-center items-center">
          <p className="font-kanit font-bold text-sm text-gray-800">
            ค่า BMR ที่คำนวณได้:
          </p>
          <p className="font-kanit font-bold text-base text-purple-800">
            {bmrResult}
          </p>
        </div>

        {/* แสดงลิงค์กลับไปหน้าหลัก */}
        <Link
          to="/"
          className="w-full mt-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-center
                     rounded-md font-kanit text-sm transition"
        >
          กลับไปหน้าหลัก
        </Link>
      </div>

      {/* ใส่ Footer */}
      <Footer />
    </>
  )
}