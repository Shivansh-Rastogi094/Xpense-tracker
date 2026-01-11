import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
}

export const getInitials = (name) => {
  if(!name) return "";
  const words= name.split("")
  let initials = "";
  for (let i = 0; i < Math.min(words.length,2); i++) {
    initials += words[i][0].toUpperCase();
  }
  return initials;
}


export const addThousandSeparators = (num) => {
  if(num==null || isNaN(num)) return "";
  const [IntegerPart, FractionalPart] = num.toString().split(".");
  const formattedInteger = IntegerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return FractionalPart ? `${formattedInteger}.${FractionalPart}` : formattedInteger;
}

export const prepareExpenseBarChartData = (data = []) => {
  const groupedData = {};

  data.forEach((item) => {
    const day = new Date(item.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });

    if (!groupedData[day]) {
      groupedData[day] = 0;
    }

    groupedData[day] += item.amount;
  });

  return Object.keys(groupedData).map((day) => ({
    month: day,     // matches XAxis dataKey
    amount: groupedData[day],
  }));
};

export const prepareIncomeBarChartData= (data =[]) =>{
  const sortedData =[...data].sort((a,b)=> new Date(a.date)-new Date(b.date))

  const chartData =sortedData.map((item)=>({
    month: moment(item?.date).format("MM YYYY"),
    amount: item?.amount,
    source: item?.source
  }))
  return chartData;
}