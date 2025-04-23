const randomValue = (min, max, decimals = 1) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
};

const stableRandomValue = (previousValue, volatility, min, max, decimals = 1) => {
  const change = (Math.random() * 2 - 1) * volatility;
  let newValue = previousValue + change;
  
  newValue = Math.max(min, Math.min(max, newValue));
  
  return parseFloat(newValue.toFixed(decimals));
};

let lastValues = {
  temperature: 24.5,
  humidity: 65.0,
  soilMoisture: 45.0,
  lightIntensity: 5000,
  batteryLevel: 85,
  rainfall: 2.0,
  windSpeed: 7.5,
  airQuality: 75,
  price: 28.45
};

export const generateSensorData = () => {
  const now = new Date();
  
  lastValues = {
    temperature: stableRandomValue(lastValues.temperature, 0.3, 18, 32, 1),
    humidity: stableRandomValue(lastValues.humidity, 0.5, 40, 90, 1),
    soilMoisture: stableRandomValue(lastValues.soilMoisture, 0.2, 20, 80, 1),
    lightIntensity: stableRandomValue(lastValues.lightIntensity, 100, 500, 10000, 0),
    batteryLevel: stableRandomValue(lastValues.batteryLevel, 0.1, 50, 100, 0),
    rainfall: stableRandomValue(lastValues.rainfall, 0.1, 0, 10, 1),
    windSpeed: stableRandomValue(lastValues.windSpeed, 0.4, 0, 15, 1),
    airQuality: stableRandomValue(lastValues.airQuality, 2, 20, 150, 0)
  };
  
  return {
    timestamp: now.toISOString(),
    ...lastValues
  };
};

export const generateHistoricalSensorData = (count = 20) => {
  const data = [];
  const now = Date.now();
  
  lastValues = {
    temperature: 24.5,
    humidity: 65.0,
    soilMoisture: 45.0,
    lightIntensity: 5000,
    batteryLevel: 85,
    rainfall: 2.0,
    windSpeed: 7.5,
    airQuality: 75,
    price: 28.45
  };
  
  let currentValues = { ...lastValues };
  
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now - (count - 1 - i) * 5000).toISOString();
    
    currentValues = {
      temperature: stableRandomValue(currentValues.temperature, 0.15, 18, 32, 1),
      humidity: stableRandomValue(currentValues.humidity, 0.25, 40, 90, 1),
      soilMoisture: stableRandomValue(currentValues.soilMoisture, 0.1, 20, 80, 1),
      lightIntensity: stableRandomValue(currentValues.lightIntensity, 50, 500, 10000, 0),
      batteryLevel: stableRandomValue(currentValues.batteryLevel, 0.05, 50, 100, 0),
      rainfall: stableRandomValue(currentValues.rainfall, 0.05, 0, 10, 1),
      windSpeed: stableRandomValue(currentValues.windSpeed, 0.2, 0, 15, 1),
      airQuality: stableRandomValue(currentValues.airQuality, 1, 20, 150, 0)
    };
    
    data.push({
      timestamp,
      ...currentValues
    });
  }
  
  lastValues = { ...currentValues };
  
  return data;
};

export const generatePriceHistory = (count = 20) => {
  const data = [];
  const now = Date.now();
  let currentPrice = 28.45;
  
  let trend = Math.random() > 0.5 ? 0.02 : -0.02;
  let trendStrength = randomValue(0.3, 0.7, 2);
  let volatility = 0.05;
  
  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.15) {
      trend = -trend;
      trendStrength = randomValue(0.3, 0.7, 2);
    }
    
    const trendComponent = trend * trendStrength;
    const randomComponent = (Math.random() * 2 - 1) * volatility;
    const priceChange = trendComponent + randomComponent;
    
    currentPrice = parseFloat((currentPrice + priceChange).toFixed(2));
    
    if (currentPrice < 27.5) {
      currentPrice = 27.5 + randomValue(0, 0.1, 2);
      trend = Math.abs(trend);
    }
    if (currentPrice > 29.5) {
      currentPrice = 29.5 - randomValue(0, 0.1, 2);
      trend = -Math.abs(trend);
    }
    
    data.push({
      time: new Date(now - (count - 1 - i) * 30000).toISOString(),
      price: currentPrice
    });
  }
  
  lastValues.price = currentPrice;
  
  return data;
};

export const getNextCryptoPrice = () => {
  const defaultState = {
    regime: 0,
    regimeDuration: 0,
    maxRegimeDuration: Math.floor(randomValue(25, 40, 0)),
    trend: 0,
    volatility: 0.01,
    momentum: 0,
    previousDirection: 0
  };
  
  let state;
  try {
    if (typeof window !== 'undefined') {
      window.cryptoMarketState = window.cryptoMarketState || defaultState;
      state = window.cryptoMarketState;
    } else {
      state = defaultState;
    }
  } catch (e) {
    state = defaultState;
  }
  
  if (isNaN(lastValues.price) || lastValues.price === undefined) {
    lastValues.price = 28.45;
  }
  
  state.regimeDuration++;
  
  if (state.regimeDuration > state.maxRegimeDuration || Math.random() > 0.98) {
    const regimeRandom = Math.random();
    if (regimeRandom < 0.6) {
      state.regime = 0;
    } else if (regimeRandom < 0.8) {
      state.regime = 1;
    } else if (regimeRandom < 0.95) {
      state.regime = 2;
    } else {
      state.regime = 3;
    }
    
    state.regimeDuration = 0;
    state.maxRegimeDuration = Math.floor(randomValue(25, 40, 0));
    
    switch (state.regime) {
      case 0:
        state.trend = 0;
        state.volatility = randomValue(0.005, 0.015, 3);
        break;
      case 1:
        state.trend = randomValue(0.005, 0.015, 3);
        state.volatility = randomValue(0.005, 0.02, 3);
        break;
      case 2:
        state.trend = -randomValue(0.005, 0.015, 3);
        state.volatility = randomValue(0.005, 0.02, 3);
        break;
      case 3:
        state.trend = 0;
        state.volatility = randomValue(0.02, 0.04, 3);
        break;
      default:
        state.trend = 0;
        state.volatility = 0.01;
    }
  }
  
  const meanPrice = 28.45;
  const distanceFromMean = lastValues.price - meanPrice;
  const meanReversion = -distanceFromMean * randomValue(0.02, 0.05, 3);
  
  const noise = (Math.random() * 2 - 1) * state.volatility * 0.7;
  
  if (noise > 0) {
    if (state.previousDirection >= 0) {
      state.momentum = Math.min(state.momentum + 0.002, 0.015);
    } else {
      state.momentum = 0;
    }
    state.previousDirection = 1;
  } else {
    if (state.previousDirection <= 0) {
      state.momentum = Math.min(state.momentum + 0.002, 0.015);
    } else {
      state.momentum = 0;
    }
    state.previousDirection = -1;
  }
  
  const jumpProbability = 0.02;
  const jumpComponent = Math.random() < jumpProbability ? 
    (Math.random() > 0.5 ? 1 : -1) * randomValue(0.02, 0.08, 2) : 0;
  
  const priceChange = state.trend + meanReversion + noise + 
                      (noise > 0 ? state.momentum : -state.momentum) + jumpComponent;
  
  const dampedPriceChange = priceChange * 0.8;
                      
  const newPrice = parseFloat((lastValues.price + dampedPriceChange).toFixed(2));
  
  if (newPrice < 27.8 || isNaN(newPrice)) {
    lastValues.price = 27.8 + randomValue(0, 0.05, 2);
    state.trend = Math.abs(state.trend) * 0.3;
  } else if (newPrice > 29.2) {
    lastValues.price = 29.2 - randomValue(0, 0.05, 2);
    state.trend = -Math.abs(state.trend) * 0.3;
  } else {
    lastValues.price = newPrice;
  }
  
  if (isNaN(lastValues.price)) {
    console.warn('NaN detected in price calculation, resetting to default');
    lastValues.price = 28.45;
  }
  
  return lastValues.price;
};

export const generateMarketOrders = () => {
  const basePrice = lastValues.price || 28.45;
  
  // Create a tight bid-ask spread that narrows around the current price
  const bestBidPrice = parseFloat((basePrice - randomValue(0.01, 0.03, 2)).toFixed(2));
  const bestAskPrice = parseFloat((basePrice + randomValue(0.01, 0.03, 2)).toFixed(2));
  
  // Generate buy orders (bids) with realistic price distribution and volume
  const buyOrders = [];
  
  // First add the levels close to current price (tighter spread, higher volume)
  for (let i = 0; i < 3; i++) {
    const price = parseFloat((bestBidPrice - 0.02 * i).toFixed(2));
    
    // Higher volume near the inside market
    const volume = i === 0 
      ? Math.floor(randomValue(150, 350, 0)) 
      : Math.floor(randomValue(100, 280, 0) * (1 - (i * 0.15)));
      
    buyOrders.push({
      price,
      amount: volume,
      get total() { return parseFloat((this.price * this.amount).toFixed(2)); }
    });
  }
  
  // Then add some larger levels for depth (wider spread, lower volume)
  for (let i = 0; i < 4; i++) {
    const priceDrop = 0.05 + (i * 0.03); // Larger price gaps as we move away from best bid
    const price = parseFloat((bestBidPrice - priceDrop).toFixed(2));
    
    // Volume tends to cluster at certain price points
    const isKeyLevel = Math.random() > 0.7;
    const volume = isKeyLevel
      ? Math.floor(randomValue(180, 400, 0)) // larger orders at key levels
      : Math.floor(randomValue(50, 150, 0)); // smaller orders in between
    
    buyOrders.push({
      price,
      amount: volume,
      get total() { return parseFloat((this.price * this.amount).toFixed(2)); }
    });
  }
  
  // Generate sell orders (asks) with realistic price distribution and volume
  const sellOrders = [];
  
  // First add the levels close to current price (tighter spread, higher volume)
  for (let i = 0; i < 3; i++) {
    const price = parseFloat((bestAskPrice + 0.02 * i).toFixed(2));
    
    // Higher volume near the inside market
    const volume = i === 0 
      ? Math.floor(randomValue(150, 350, 0)) 
      : Math.floor(randomValue(100, 280, 0) * (1 - (i * 0.15)));
      
    sellOrders.push({
      price,
      amount: volume,
      get total() { return parseFloat((this.price * this.amount).toFixed(2)); }
    });
  }
  
  // Then add some larger levels for depth (wider spread, lower volume)
  for (let i = 0; i < 4; i++) {
    const priceJump = 0.05 + (i * 0.03); // Larger price gaps as we move away from best ask
    const price = parseFloat((bestAskPrice + priceJump).toFixed(2));
    
    // Volume tends to cluster at certain price points
    const isKeyLevel = Math.random() > 0.7;
    const volume = isKeyLevel
      ? Math.floor(randomValue(180, 400, 0)) // larger orders at key levels
      : Math.floor(randomValue(50, 150, 0)); // smaller orders in between
    
    sellOrders.push({
      price,
      amount: volume,
      get total() { return parseFloat((this.price * this.amount).toFixed(2)); }
    });
  }
  
  // Sort orders correctly - bids highest to lowest, asks lowest to highest
  buyOrders.sort((a, b) => b.price - a.price);
  sellOrders.sort((a, b) => a.price - b.price);
  
  // Take only the top 5 orders for each side
  return { 
    buy: buyOrders.slice(0, 5), 
    sell: sellOrders.slice(0, 5) 
  };
};

export const generateTransactions = (count = 5) => {
  const now = Date.now();
  const currentPrice = lastValues.price || 28.45;
  
  // Names and entities participating in the marketplace
  const farmNames = [
    'Farm A', 'Farm B', 'Organic Growers', 'Green Fields', 'Sustainable Farms', 
    'EcoHarvest', 'Smith Family Farms', 'Valley Growers', 'Highland Agriculture'
  ];
  
  const corpNames = [
    'Corp X', 'Corp Y', 'EcoTrade', 'GreenEnergy', 'Sustainable Co.',
    'CarbonZero', 'ClimatePartners', 'GreenTech Solutions', 'EarthFund'
  ];
  
  // Generate unique transactions
  return Array(count).fill(0).map((_, index) => {
    // Generate a realistic price close to the current market price
    // Transactions are more likely to happen at or near the current price
    let transactionType;
    let price;
    
    const priceVariance = Math.random();
    if (priceVariance < 0.6) {
      // 60% of transactions happen very close to current price
      price = parseFloat((currentPrice + (Math.random() * 0.04 - 0.02)).toFixed(2));
      transactionType = Math.random() > 0.5 ? 'market' : 'limit';
    } else if (priceVariance < 0.9) {
      // 30% of transactions happen at a slight distance from current price
      price = parseFloat((currentPrice + (Math.random() * 0.2 - 0.1)).toFixed(2));
      transactionType = 'limit';
    } else {
      // 10% of transactions are outliers (could be large block trades)
      price = parseFloat((currentPrice + (Math.random() * 0.4 - 0.2)).toFixed(2));
      transactionType = 'block';
    }
    
    // Choose transaction direction (buy/sell)
    const isBuy = Math.random() > 0.5;
    
    // Select parties involved in transaction
    let from, to;
    if (isBuy) {
      from = corpNames[Math.floor(Math.random() * corpNames.length)];
      to = farmNames[Math.floor(Math.random() * farmNames.length)];
    } else {
      from = farmNames[Math.floor(Math.random() * farmNames.length)];
      to = corpNames[Math.floor(Math.random() * corpNames.length)];
    }
    
    // Generate appropriate amount based on transaction type
    let amount;
    if (transactionType === 'market' || transactionType === 'limit') {
      // Regular-sized transactions
      amount = Math.floor(randomValue(50, 250, 0));
    } else {
      // Block trades are larger
      amount = Math.floor(randomValue(300, 1000, 0));
    }
    
    // Create timestamp with more recent transactions at the top
    // Generate a unique ID that looks like a blockchain hash
    const hash = `0x${Math.random().toString(16).substring(2, 6)}${Math.random().toString(16).substring(2, 6)}`;
    
    return {
      hash,
      from,
      to,
      amount,
      price,
      total: parseFloat((amount * price).toFixed(2)),
      type: transactionType,
      isBuy,
      timestamp: new Date(now - index * 60000 - Math.floor(Math.random() * 30000)).toISOString()
    };
  });
}; 