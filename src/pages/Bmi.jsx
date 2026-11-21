import { useState } from 'react'
import { Link } from 'react-router'
import bmi from './../assets/bmi.png'

export default function Bmi() {
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [bmiResult, setBmiResult] = useState('0.00')

    // ฟังก์ชันคำนวณ BMI
    const handleCalculateBmi = () => {
        const w = parseFloat(weight)
        const h = parseFloat(height)

        if (!w || !h || w <= 0 || h <= 0) {
            alert('กรุณาป้อนน้ำหนักและส่วนสูงให้ถูกต้อง')
            return
        }

        const heightInMeters = h / 100
        const calculatedBmi = w / (heightInMeters * heightInMeters)
        setBmiResult(calculatedBmi.toFixed(2))
    }

    // ฟังก์ชันรีเซ็ตค่า
    const handleReset = () => {
        setWeight('')
        setHeight('')
        setBmiResult('0.00')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 font-kanit">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.08)] border border-gray-100 p-8">
                {/* หัวข้อ */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        BMI Calculator
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        คำนวณ BMI
                    </p>
                </div>

                {/* รูปภาพไอคอน */}
                <div className="flex justify-center my-5">
                    <img src={bmi} alt="BMI" className="w-20" />
                </div>

                {/* ฟอร์มกรอกข้อมูล */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            ป้อนน้ำหนัก (กิโลกรัม)
                        </label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="เช่น 65"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            ป้อนส่วนสูง (เซนติเมตร)
                        </label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="เช่น 170"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* ปุ่มคำนวณ และ รีเซ็ต */}
                <div className="mt-5 space-y-2.5">
                    <button
                        type="button"
                        onClick={handleCalculateBmi}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md text-sm transition cursor-pointer"
                    >
                        คำนวณ BMI
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 rounded-md text-sm transition cursor-pointer"
                    >
                        รีเซ็ต
                    </button>
                </div>

                {/* แสดงผลลัพธ์ */}
                <div className="text-center my-5">
                    <p className="text-sm font-bold text-gray-800">
                        ค่า BMI ที่คำนวณได้:{' '}
                        <span className="text-blue-600">{bmiResult}</span>
                    </p>
                </div>

                {/* ปุ่มกลับหน้าหลัก */}
                <Link
                    to="/"
                    className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 rounded-md text-sm transition"
                >
                    กลับหน้าหลัก
                </Link>
            </div>
        </div>
    )
}