export const idlFactory = ({ IDL }) => {
  const MaintenanceItem = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'currentHours' : IDL.Float64,
    'nextDue' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : MaintenanceItem, 'err' : IDL.Text });
  return IDL.Service({
    'createItem' : IDL.Func([IDL.Text, IDL.Text, IDL.Float64], [Result], []),
    'getItems' : IDL.Func([], [IDL.Vec(MaintenanceItem)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
