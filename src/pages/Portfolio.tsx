import { useState } from "react";
import { Search, Plus, Filter, Download, TrendingUp, TrendingDown, Minus } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  ltp: number;
  gainLoss: number;
  gainLossPercent: number;
  sector: string;
  investment: number;
  currentValue: number;
}

const mockHoldings: Holding[] = [
  {
    id: "1",
    symbol: "TCS",
    name: "Tata Consultancy Services",
    quantity: 25,
    avgPrice: 3420.50,
    ltp: 3685.25,
    gainLoss: 6618.75,
    gainLossPercent: 7.74,
    sector: "IT",
    investment: 85512.50,
    currentValue: 92131.25,
  },
  {
    id: "2",
    symbol: "HDFC",
    name: "HDFC Bank Limited",
    quantity: 50,
    avgPrice: 1580.25,
    ltp: 1645.80,
    gainLoss: 3277.50,
    gainLossPercent: 4.15,
    sector: "Banking",
    investment: 79012.50,
    currentValue: 82290.00,
  },
  {
    id: "3",
    symbol: "INFY",
    name: "Infosys Limited",
    quantity: 30,
    avgPrice: 1425.75,
    ltp: 1389.45,
    gainLoss: -1089.00,
    gainLossPercent: -2.55,
    sector: "IT",
    investment: 42772.50,
    currentValue: 41683.50,
  },
  {
    id: "4",
    symbol: "RELIANCE",
    name: "Reliance Industries",
    quantity: 15,
    avgPrice: 2456.80,
    ltp: 2612.35,
    gainLoss: 2333.25,
    gainLossPercent: 6.33,
    sector: "Energy",
    investment: 36852.00,
    currentValue: 39185.25,
  },
  {
    id: "5",
    symbol: "ITC",
    name: "ITC Limited",
    quantity: 100,
    avgPrice: 412.30,
    ltp: 398.75,
    gainLoss: -1355.00,
    gainLossPercent: -3.29,
    sector: "FMCG",
    investment: 41230.00,
    currentValue: 39875.00,
  },
];

export default function Portfolio() {
  const [holdings] = useState<Holding[]>(mockHoldings);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSector, setFilterSector] = useState("all");
  const [sortBy, setSortBy] = useState("gainLoss");

  const filteredHoldings = holdings
    .filter(holding => 
      holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(holding => 
      filterSector === "all" || holding.sector === filterSector
    )
    .sort((a, b) => {
      if (sortBy === "gainLoss") return b.gainLoss - a.gainLoss;
      if (sortBy === "gainLossPercent") return b.gainLossPercent - a.gainLossPercent;
      if (sortBy === "symbol") return a.symbol.localeCompare(b.symbol);
      return 0;
    });

  const totalInvestment = holdings.reduce((sum, holding) => sum + holding.investment, 0);
  const totalCurrentValue = holdings.reduce((sum, holding) => sum + holding.currentValue, 0);
  const totalGainLoss = totalCurrentValue - totalInvestment;
  const totalGainLossPercent = (totalGainLoss / totalInvestment) * 100;

  const sectors = Array.from(new Set(holdings.map(h => h.sector)));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-xl bg-gradient-card border border-primary/20 shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-gradient-primary">My Portfolio</h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Manage and track your stock investments
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="hover:bg-gradient-hover transition-all duration-300">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-gradient-primary hover:bg-gradient-primary/90 shadow-glow animate-glow-pulse">
            <Plus className="w-4 h-4 mr-2" />
            Add Stock
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-lg border border-primary/20 hover:shadow-glow transition-all duration-300 animate-scale-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Investment</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(totalInvestment)}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-primary/20 rounded-lg flex items-center justify-center animate-float">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-lg border border-primary/20 hover:shadow-glow transition-all duration-300 animate-scale-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Value</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(totalCurrentValue)}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-cyber/20 rounded-lg flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                <TrendingUp className="w-6 h-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-lg border border-primary/20 hover:shadow-glow transition-all duration-300 animate-scale-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total P&L</p>
                <p className={cn(
                  "text-2xl font-bold",
                  totalGainLoss >= 0 ? "text-success" : "text-destructive"
                )}>
                  {formatCurrency(totalGainLoss)}
                </p>
              </div>
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center animate-float",
                totalGainLoss >= 0 ? "bg-gradient-success/20" : "bg-destructive/10"
              )} style={{ animationDelay: '1s' }}>
                {totalGainLoss >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-success animate-pulse" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-destructive animate-pulse" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-lg border border-primary/20 hover:shadow-glow transition-all duration-300 animate-scale-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Return %</p>
                <p className={cn(
                  "text-2xl font-bold",
                  totalGainLossPercent >= 0 ? "text-success" : "text-destructive"
                )}>
                  {totalGainLossPercent >= 0 ? "+" : ""}{totalGainLossPercent.toFixed(2)}%
                </p>
              </div>
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center animate-float",
                totalGainLossPercent >= 0 ? "bg-gradient-success/20" : "bg-destructive/10"
              )} style={{ animationDelay: '1.5s' }}>
                {totalGainLossPercent >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-success animate-pulse" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-destructive animate-pulse" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gradient-card shadow-lg border border-primary/20 hover:shadow-glow transition-all duration-300">
        <CardHeader className="bg-gradient-hover/30 rounded-t-lg">
          <CardTitle className="text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Holdings ({filteredHoldings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
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
            
            <Select value={filterSector} onValueChange={setFilterSector}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gainLoss">P&L Amount</SelectItem>
                <SelectItem value="gainLossPercent">P&L Percentage</SelectItem>
                <SelectItem value="symbol">Stock Symbol</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Holdings Table */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Stock</TableHead>
                  <TableHead className="font-semibold">Qty</TableHead>
                  <TableHead className="font-semibold">Avg Price</TableHead>
                  <TableHead className="font-semibold">LTP</TableHead>
                  <TableHead className="font-semibold">Investment</TableHead>
                  <TableHead className="font-semibold">Current Value</TableHead>
                  <TableHead className="font-semibold">P&L</TableHead>
                  <TableHead className="font-semibold">P&L %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHoldings.map((holding) => (
                  <TableRow key={holding.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-3">
                          <p className="font-semibold text-foreground">{holding.symbol}</p>
                          <Badge variant="secondary" className="text-xs">
                            {holding.sector}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{holding.name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{holding.quantity}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(holding.avgPrice)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(holding.ltp)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(holding.investment)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(holding.currentValue)}</TableCell>
                    <TableCell>
                      <div className={cn(
                        "flex items-center gap-1 font-semibold",
                        holding.gainLoss >= 0 ? "text-success" : "text-destructive"
                      )}>
                        {holding.gainLoss >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {formatCurrency(Math.abs(holding.gainLoss))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={cn(
                        "font-semibold",
                        holding.gainLossPercent >= 0 ? "text-success" : "text-destructive"
                      )}>
                        {holding.gainLossPercent >= 0 ? "+" : ""}{holding.gainLossPercent.toFixed(2)}%
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredHoldings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No holdings found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}