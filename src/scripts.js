import './css/base.scss';
import './domUpdates';
import datepicker from 'js-datepicker';

let duration = null;
const start = datepicker('.start', { id: 1,
  minDate: new Date(),
  onMonthChange: instance => { event.preventDefault() }
 });
const end = datepicker('.end', { id: 1,
  minDate: new Date(),
  onMonthChange: instance => { event.preventDefault() } ,
  onSelect: instances => { document.getElementById('duration').value = calculateRange() }
});

function calculateRange() {
  let value = end.getRange();
  console.log('value', value);
  return (value.end - value.start) / (1000 * 60 * 60 * 24);
}
