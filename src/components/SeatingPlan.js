// /components/SeatingPlan.js

const SeatingPlan = ({ tables }) => {
    return (
      <div className="seating-plan">
        {tables.map((table) => (
          <div key={table.id} className="table">
            <h2>{table.name}</h2>
            <p>Available Seats: {table.availableSeats}</p>
            <ul>
              {table.assignedGuests.map((guest) => (
                <li key={guest.id}>
                  {guest.name} (Seat {guest.seat})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  export default SeatingPlan;
  