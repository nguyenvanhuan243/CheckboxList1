import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [holidays, setHolidays] = React.useState({
    federal: [
      { name: "New Year's Day", selected: false },
      { name: "Martin Luther King, Jr. Day", selected: false },
      { name: "George Washington's Birthday", selected: false },
      { name: "Memorial Day", selected: false },
      { name: "Independence Day", selected: false },
      { name: "Labor Day", selected: false },
      { name: "Columbus Day", selected: false },
      { name: "Veterans Day", selected: false },
      { name: "Thanksgiving Day", selected: false },
      { name: "Christmas Day", selected: false }
    ],
    other: [
      { name: "Black Friday", selected: false },
      { name: "Christmas Eve", selected: false },
      { name: "New Year's Eve", selected: false }
    ]
  });

  const handleOnChange = (e, type) => {
    const { name, checked } = e.target;
    const newHoliday = [...holidays[type]];
    const index = newHoliday.findIndex(h => h.name === name);
    if (index > -1) {
      newHoliday[index] = { name, selected: checked };
    }
    setHolidays(h => ({ ...h, [type]: newHoliday }));
  };

  const handleOnSelectAll = (e, type) => {
    const { checked } = e.target;
    let newHoliday = [...holidays[type]];
    if (!checked) {
      newHoliday = newHoliday.map(opt => ({ ...opt, selected: false }));
    } else {
      newHoliday = newHoliday.map(opt => ({ ...opt, selected: true }));
    }
    setHolidays(h => ({ ...h, [type]: newHoliday }));
  };

  const renderCheckboxList = (options, type) =>
    options.map(opt => (
      <div>
        <label>
          <input
            type="checkbox"
            name={opt.name}
            onChange={e => handleOnChange(e, type)}
            checked={opt.selected}
          />
          {opt.name}
        </label>
      </div>
    ));

  const renderSelectAllCheckbox = type => (
    <div>
      <label>
        <input
          type="checkbox"
          onChange={e => handleOnSelectAll(e, type)}
          checked={holidays[type].every(opt => opt.selected)}
        />
        {`Select All ${type}`}
      </label>
    </div>
  );

  return (
    <section style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <div>
          <fieldset>
            Federal Holidays
            {renderSelectAllCheckbox("federal")}
            {renderCheckboxList(holidays.federal, "federal")}
          </fieldset>
        </div>
        <div>
          <fieldset>
            Other Holidays
            {renderSelectAllCheckbox("other")}
            {renderCheckboxList(holidays.other, "other")}
          </fieldset>
        </div>
      </div>
      <div>
        State:
        <pre>{JSON.stringify(holidays, null, 2)}</pre>
      </div>
    </section>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
