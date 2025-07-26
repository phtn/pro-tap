import { motion } from "motion/react";
import { DetailHeader } from "./sub-components";

interface BudgetScreenProps {
  onNext: () => void;
  onPrev: () => void;
}

export const BudgetScreen = (props: BudgetScreenProps) => {
  const budgetItems = [
    { category: "Development", allocated: 45000, spent: 22500, percentage: 50 },
    { category: "Design", allocated: 15000, spent: 13500, percentage: 90 },
    { category: "Testing", allocated: 8000, spent: 2400, percentage: 30 },
    {
      category: "Infrastructure",
      allocated: 5000,
      spent: 3000,
      percentage: 60,
    },
    { category: "Marketing", allocated: 7000, spent: 0, percentage: 0 },
  ];

  const totalAllocated = budgetItems.reduce(
    (sum, item) => sum + item.allocated,
    0,
  );
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);
  const overallPercentage = Math.round((totalSpent / totalAllocated) * 100);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}

      <DetailHeader label="Budget" {...props} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 overflow-y-auto space-y-6"
      >
        {/* Budget Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Budget Overview</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-blue-100 text-sm">Total Allocated</p>
              <p className="text-2xl font-bold">
                {formatCurrency(totalAllocated)}
              </p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">Total Spent</p>
              <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{overallPercentage}%</span>
            </div>
            <div className="w-full bg-blue-400 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              ></div>
            </div>
            <p className="text-blue-100 text-sm">
              Remaining: {formatCurrency(totalAllocated - totalSpent)}
            </p>
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Budget Breakdown
          </h3>
          {budgetItems.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg p-4 shadow-sm border"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800">{item.category}</h4>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {formatCurrency(item.spent)} /{" "}
                    {formatCurrency(item.allocated)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.percentage}% used
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(item.percentage)}`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Budget Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-lg p-6 shadow-sm border"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Budget Status
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">On Track</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-sm text-gray-600">At Risk</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-sm text-gray-600">Over Budget</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
