import { useState } from 'react'
import { Link } from 'react-router'
import car from './../assets/car.png'

export default function Car() {
    const [calculatorName, setCalculatorName] = useState('')
    const [carPrice, setCarPrice] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [downPaymentPercent, setDownPaymentPercent] = useState(15)
    const [months, setMonths] = useState(24)
    const [monthlyInstallment, setMonthlyInstallment] = useState('0.00')

    const downPaymentOptions = [15, 20, 25, 30, 35]
    const monthOptions = [24, 36, 48, 60, 72, 84]

    // ฟังก์ชันคำนวณค่างวดรถยนต์
    const handleCalculateCar = () => {
        const price = parseFloat(carPrice)
        const rate = parseFloat(interestRate)

        if (!calculatorName.trim() || !price || price <= 0 || isNaN(rate) || rate < 0) {
            alert('กรุณาป้อนข้อมูลให้ครบถ้วนและถูกต้อง')
            return
        }

        // 1. คำนวณเงินดาวน์ และ ยอดจัดไฟแนนซ์: ราคารถ - เงินดาวน์
        const downPaymentAmount = price * (downPaymentPercent / 100)
        const financeAmount = price - downPaymentAmount

        // 2. คำนวณดอกเบี้ย: ยอดจัดไฟแนนซ์ x อัตราดอกเบี้ยรายปี x จำนวนปีที่ผ่อน
        const years = months / 12
        const totalInterest = financeAmount * (rate / 100) * years

        // 3. คำนวณยอดรวมทั้งหมดที่ต้องผ่อน: ยอดจัดไฟแนนซ์ + ดอกเบี้ยทั้งหมด
        const totalPayable = financeAmount + totalInterest

        // 4. คำนวณค่างวดต่อเดือน: ยอดรวมทั้งหมดที่ต้องผ่อน / จำนวนเดือนที่ผ่อน
        const perMonth = totalPayable / months

        setMonthlyInstallment(
            perMonth.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })
        )
    }

    // ฟังก์ชันล้างข้อมูล
    const handleReset = () => {
        setCalculatorName('')
        setCarPrice('')
        setInterestRate('')
        setDownPaymentPercent(15)
        setMonths(24)
        setMonthlyInstallment('0.00')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8 font-kanit">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.08)] border border-gray-100 p-8">
                {/* หัวข้อ */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Car Installment Calculator
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">
                        คำนวณ Car Installment
                    </p>
                </div>

                {/* รูปภาพไอคอน */}
                <div className="flex justify-center my-4">
                    <img src={car} alt="Car Installment" className="w-24" />
                </div>

                {/* ฟอร์มกรอกข้อมูล */}
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            ชื่อผู้คำนวณ
                        </label>
                        <input
                            type="text"
                            value={calculatorName}
                            onChange={(e) => setCalculatorName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            ราคารถ (บาท)
                        </label>
                        <input
                            type="number"
                            value={carPrice}
                            onChange={(e) => setCarPrice(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            ดอกเบี้ยต่อปี (%)
                        </label>
                        <input
                            type="number"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* เงินดาวน์ (%) */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            เงินดาวน์ (%)
                        </label>
                        <div className="flex items-center gap-3 flex-wrap">
                            {downPaymentOptions.map((percent) => (
                                <label
                                    key={percent}
                                    className="inline-flex items-center gap-1 text-xs text-gray-700 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="downPayment"
                                        value={percent}
                                        checked={downPaymentPercent === percent}
                                        onChange={() => setDownPaymentPercent(percent)}
                                        className="accent-blue-600 cursor-pointer"
                                    />
                                    <span>{percent}%</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* จำนวนเดือนที่ผ่อน */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            จำนวนเดือนที่ผ่อน
                        </label>
                        <select
                            value={months}
                            onChange={(e) => setMonths(Number(e.target.value))}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {monthOptions.map((m) => (
                                <option key={m} value={m}>
                                    {m} เดือน
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* ปุ่มคำนวณ และ ล้างข้อมูล */}
                <div className="grid grid-cols-2 gap-3 mt-5">
                    <button
                        type="button"
                        onClick={handleCalculateCar}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md text-xs transition cursor-pointer"
                    >
                        คำนวณ
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-md text-xs transition cursor-pointer"
                    >
                        ล้างข้อมูล
                    </button>
                </div>

                {/* แสดงผลลัพธ์ */}
                <div className="text-center my-4">
                    <p className="text-xs font-bold text-gray-800">
                        ผ่อนชำระต่อเดือน: {monthlyInstallment} บาท
                    </p>
                </div>

                {/* ปุ่มกลับหน้าหลัก */}
                <Link
                    to="/"
                    className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-md text-xs transition"
                >
                    กลับหน้าหลัก
                </Link>
            </div>
        </div>
    )
}