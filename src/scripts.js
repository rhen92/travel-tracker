import './css/base.scss';
import './domUpdates';
import datepicker from 'js-datepicker';

let duration = null;
const start = datepicker('.start', { id: 'calendar',
  minDate: new Date(),
  onMonthChange: instance => { event.preventDefault() }
 });
const end = datepicker('.end', { id: 'calendar',
  minDate: new Date(),
  onMonthChange: instance => { event.preventDefault() } ,
  onSelect: instances => { document.getElementById('duration').value = calculateRange() }
});

function calculateRange() {
  let value = end.getRange();
  return Math.round((value.end - value.start) / (1000 * 60 * 60 * 24));
}
