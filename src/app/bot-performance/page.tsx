"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api";
import axios from "axios"
interface TradeData {
    date: string;
    long: string;
    short: string;
    netProfit: number;
}

const BotPerformance = () => {
    const { toast } = useToast();
    const [currentPosition, setCurrentPosition] = useState<TradeData>({
        date: new Date().toLocaleDateString(),
        long: "ETH",
        short: "BTC",
        netProfit: 12.5,
    });

    const [botHistory] = useState<TradeData[]>([
        { date: "2025-09-15", long: "ETH", short: "BTC", netProfit: 8.3 },
        { date: "2025-09-10", long: "BTC", short: "ETH", netProfit: -3.2 },
        { date: "2025-09-05", long: "ETH", short: "SOL", netProfit: 15.7 },
        { date: "2025-09-01", long: "BTC", short: "ADA", netProfit: 6.4 },
    ]);

    const handleRefresh = async () => {

        const res = await api.get("/api/users")

        console.log("res => ", res.data)
        setCurrentPosition((prev) => ({
            ...prev,
            netProfit: res.data, // ✅ update only netProfit
        }));

        toast({
            title: "Data Refreshed",
            description: "Bot performance data has been updated.",
        });
    };

    const getPLColor = (pl: number) => {
        return pl >= 0 ? "text-success" : "text-destructive";
    };


    useEffect(() => {
        handleRefresh()
    }, [])

    return (
        // <div className="min-h-screen bg-background p-6 ">
        <div className="min-h-screen bg-white p-6 ">

            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-4xl font-bold text-center text-foreground text-gray-900">
                        Zojax Bot Performance
                    </h1>
                    <Button onClick={handleRefresh} variant="default" className="gap-2">
                        <RefreshCw className="w-4 h-4 text-gray-900" />
                        <p className="text-gray-900">
                            Refresh Data
                        </p>
                    </Button>
                </div>

                {/* Current Bot Cycle */}
                <Card className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-foreground">Current Bot Cycle</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-900 text-foreground">Date</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-900 text-foreground">Long</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-900 text-foreground">Short</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-900 text-foreground">P/L (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                                    <td className="py-3 px-4 text-gray-700 text-foreground">{currentPosition.date}</td>
                                    <td className="py-3 px-4 text-gray-700 text-foreground font-medium">{currentPosition.long}</td>
                                    <td className="py-3 px-4 text-gray-700 text-foreground font-medium">{currentPosition.short}</td>
                                    <td className={`py-3 px-4 text-gray-700 font-semibold ${getPLColor(currentPosition.netProfit)}`}>
                                        {currentPosition.netProfit > 0 ? "+" : ""}{currentPosition.netProfit}%
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Bot History */}
                <Card className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-900  mb-4 text-foreground">Bot History</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4 text-gray-900 font-semibold text-foreground">Date</th>
                                    <th className="text-left py-3 px-4 text-gray-900 font-semibold text-foreground">Long</th>
                                    <th className="text-left py-3 px-4 text-gray-900 font-semibold text-foreground">Short</th>
                                    <th className="text-left py-3 px-4 text-gray-900 font-semibold text-foreground">P/L (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {botHistory.map((trade, index) => (
                                    <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                                        <td className="py-3 px-4 text-gray-700 text-foreground">{trade.date}</td>
                                        <td className="py-3 px-4 text-gray-700 text-foreground font-medium">{trade.long}</td>
                                        <td className="py-3 px-4 text-gray-700 text-foreground font-medium">{trade.short}</td>
                                        <td className={`py-3 px-4 text-gray-700 font-semibold ${getPLColor(trade.netProfit)}`}>
                                            {trade.netProfit > 0 ? "+" : ""}{trade.netProfit.toFixed(2)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default BotPerformance;