import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Users, ArrowRightLeft, AlertCircle } from "lucide-react";

type InventoryItem = {
  blood_type: string;
  units_available: number;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [stats, setStats] = useState({
    totalUnits: 0,
    donorCount: 0,
    pendingTransfers: 0,
    urgentRequests: 0,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
      } else {
        fetchInventory(session.user.id);
        fetchStats(session.user.id);
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchInventory = async (userId: string) => {
    const { data, error } = await supabase
      .from("inventory")
      .select("blood_type, units_available")
      .eq("hospital_id", userId);

    if (!error && data) {
      setInventory(data);
    }
  };

  const fetchStats = async (userId: string) => {
    // Fetch total units
    const { data: inventoryData } = await supabase
      .from("inventory")
      .select("units_available")
      .eq("hospital_id", userId);

    const totalUnits = inventoryData?.reduce((sum, item) => sum + item.units_available, 0) || 0;

    // Fetch donor count
    const { count: donorCount } = await supabase
      .from("donors")
      .select("*", { count: "exact", head: true })
      .eq("hospital_id", userId);

    // Fetch pending transfers
    const { count: pendingTransfers } = await supabase
      .from("transfers")
      .select("*", { count: "exact", head: true })
      .or(`from_hospital_id.eq.${userId},to_hospital_id.eq.${userId}`)
      .eq("status", "pending");

    // Fetch urgent requests
    const { count: urgentRequests } = await supabase
      .from("blood_requests")
      .select("*", { count: "exact", head: true })
      .eq("hospital_id", userId)
      .eq("urgency", "urgent")
      .eq("status", "pending");

    setStats({
      totalUnits,
      donorCount: donorCount || 0,
      pendingTransfers: pendingTransfers || 0,
      urgentRequests: urgentRequests || 0,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your blood inventory</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Blood Units</CardTitle>
            <Droplet className="h-4 w-4 text-medical-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUnits}</div>
            <p className="text-xs text-muted-foreground">Units in inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Registered Donors</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.donorCount}</div>
            <p className="text-xs text-muted-foreground">Active donors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Transfers</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingTransfers}</div>
            <p className="text-xs text-muted-foreground">Awaiting action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Urgent Requests</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.urgentRequests}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blood Type Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bloodType) => {
              const item = inventory.find((i) => i.blood_type === bloodType);
              const units = item?.units_available || 0;
              return (
                <div
                  key={bloodType}
                  className="flex flex-col items-center justify-center p-4 border rounded-lg bg-secondary/50"
                >
                  <div className="text-2xl font-bold text-medical-red">{bloodType}</div>
                  <div className="text-3xl font-bold mt-2">{units}</div>
                  <div className="text-xs text-muted-foreground">units</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
