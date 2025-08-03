import { useState } from "react";
import { Search, Filter, TrendingUp, TrendingDown, Plus, Eye, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FilterChip {
  id: string;
  label: string;
  active: boolean;
  description: string;
}

interface StockResult {
  id: string;
  symbol: string;
  name: string;
  ltp: number;
  change: number;
  changePercent: number;
  pe: number;
  roe: number;
  marketCap: number;
  sector: string;
  reasoning: string;
  score: number;
  signals: string[];
}

const filterChips: FilterChip[] = [
  { id: "low-pe", label: "Low PE", active: false, description: "PE Ratio < 15" },
  { id: "high-roe", label: "High ROE", active: false, description: "ROE > 15%" },
  { id: "near-200dma", label: "Near 200DMA", active: false, description: "Within 5% of 200-day MA" },
  { id: "undervalued", label: "Undervalued", active: false, description: "Price below fair value" },
  { id: "breakout", label: "Breakout", active: false, description: "Breaking resistance levels" },
  { id: "dividend-yield", label: "High Dividend", active: false, description: "Dividend Yield > 3%" },
  { id: "momentum", label: "Momentum", active: false, description: "Strong price momentum" },
  { id: "quality", label: "Quality", active: false, description: "High quality fundamentals" },
];

const mockResults: StockResult[] = [
  {
    id: "1",
    symbol: "BAJFINANCE",
    name: "Bajaj Finance Limited",
    ltp: 6842.50,
    change: 125.30,
    changePercent: 1.87,
    pe: 13.2,
    roe: 22.8,
    marketCap: 423000,
    sector: "NBFC",
    reasoning: "Strong fundamentals with low PE ratio and excellent ROE. Recent breakout above resistance at ₹6800 with high volume confirmation.",
    score: 8.7,
    signals: ["Low PE", "High ROE", "Breakout"],
  },
  {
    id: "2",
    symbol: "ASHOKLEY",
    name: "Ashok Leyland Limited",
    ltp: 185.45,
    change: -2.15,
    changePercent: -1.15,
    pe: 12.8,
    roe: 18.5,
    marketCap: 54200,
    sector: "Auto",
    reasoning: "Trading near 200-day moving average with strong fundamentals. Commercial vehicle recovery story intact with improving margins.",
    score: 7.9,
    signals: ["Low PE", "Near 200DMA", "Quality"],
  },
  {
    id: "3",
    symbol: "COALINDIA",
    name: "Coal India Limited",
    ltp: 412.80,
    change: 8.95,
    changePercent: 2.22,
    pe: 8.9,
    roe: 16.2,
    marketCap: 255000,
    sector: "Mining",
    reasoning: "Attractive dividend yield of 4.2% with consistent cash flows. Low valuation provides margin of safety for long-term investors.",
    score: 7.6,
    signals: ["Low PE", "High Dividend", "Undervalued"],
  },
  {
    id: "4",
    symbol: "WIPRO",
    name: "Wipro Limited",
    ltp: 285.60,
    change: 12.40,
    changePercent: 4.54,
    pe: 14.5,
    roe: 19.3,
    marketCap: 156000,
    sector: "IT",
    reasoning: "Strong momentum with consistent beat on earnings. Digital transformation deals providing sustainable growth. Good entry point.",
    score: 8.2,
    signals: ["Low PE", "Momentum", "Quality"],
  },
];

export default function Screener() {
  const [filters, setFilters] = useState<FilterChip[]>(filterChips);
  const [searchTerm, setSearchTerm] = useState("");
  const [results] = useState<StockResult[]>(mockResults);

  const toggleFilter = (filterId: string) => {
    setFilters(prev => prev.map(filter => 
      filter.id === filterId 
        ? { ...filter, active: !filter.active }
        : filter
    ));
  };

  const activeFilters = filters.filter(f => f.active);
  const filteredResults = results.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatMarketCap = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L Cr`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K Cr`;
    return `₹${amount} Cr`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Smart Screener</h1>
          <p className="text-muted-foreground mt-1">
            Discover stocks with AI-powered filtering and analysis
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Custom Filter
          </Button>
          <Button size="sm" className="bg-gradient-primary">
            <Brain className="w-4 h-4 mr-2" />
            AI Recommendations
          </Button>
        </div>
      </div>

      {/* Filter Chips */}
      <Card className="bg-gradient-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Smart Filters
            {activeFilters.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilters.length} active
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  "border-2 hover:scale-105",
                  filter.active
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-background border-border hover:border-primary/50"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          {activeFilters.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Active Criteria:</p>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <Badge key={filter.id} variant="outline" className="text-xs">
                    {filter.description}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search and Results */}
      <Card className="bg-card shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-foreground">
              Stock Results ({filteredResults.length})
            </CardTitle>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search stocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Stock</TableHead>
                  <TableHead className="font-semibold">LTP</TableHead>
                  <TableHead className="font-semibold">PE / ROE</TableHead>
                  <TableHead className="font-semibold">Market Cap</TableHead>
                  <TableHead className="font-semibold">Score</TableHead>
                  <TableHead className="font-semibold">AI Reasoning</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResults.map((stock) => (
                  <TableRow key={stock.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-3">
                          <p className="font-semibold text-foreground">{stock.symbol}</p>
                          <Badge variant="secondary" className="text-xs">
                            {stock.sector}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{stock.name}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {stock.signals.map((signal, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {signal}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div>
                        <p className="font-semibold text-foreground">
                          {formatCurrency(stock.ltp)}
                        </p>
                        <div className={cn(
                          "flex items-center gap-1 text-sm",
                          stock.change >= 0 ? "text-success" : "text-destructive"
                        )}>
                          {stock.change >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {stock.change >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">PE: {stock.pe}</p>
                        <p className="text-muted-foreground">ROE: {stock.roe}%</p>
                      </div>
                    </TableCell>
                    
                    <TableCell className="font-medium">
                      {formatMarketCap(stock.marketCap)}
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{stock.score}/10</span>
                          <Badge 
                            variant={stock.score >= 8 ? "default" : stock.score >= 6 ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {stock.score >= 8 ? "Strong" : stock.score >= 6 ? "Good" : "Fair"}
                          </Badge>
                        </div>
                        <Progress value={stock.score * 10} className="h-2" />
                      </div>
                    </TableCell>
                    
                    <TableCell className="max-w-xs">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {stock.reasoning}
                      </p>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Watch
                        </Button>
                        <Button size="sm" className="bg-gradient-primary">
                          <Plus className="w-4 h-4 mr-1" />
                          Buy
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredResults.length === 0 && (
            <div className="text-center py-12">
              <Brain className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No stocks found matching your criteria.</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}