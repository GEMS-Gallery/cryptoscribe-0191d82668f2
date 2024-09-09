import Float "mo:base/Float";

import Array "mo:base/Array";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Nat "mo:base/Nat";

actor {
  type MaintenanceItem = {
    id: Nat;
    title: Text;
    nextDue: Text;
    currentHours: Float;
  };

  stable var items : [MaintenanceItem] = [];
  stable var nextId : Nat = 0;

  public func createItem(title: Text, nextDue: Text, currentHours: Float) : async Result.Result<MaintenanceItem, Text> {
    let item : MaintenanceItem = {
      id = nextId;
      title = title;
      nextDue = nextDue;
      currentHours = currentHours;
    };
    items := Array.append(items, [item]);
    nextId += 1;
    #ok(item)
  };

  public query func getItems() : async [MaintenanceItem] {
    items
  };
}
