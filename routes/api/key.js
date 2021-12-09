const express = require('express');
const moment = require('moment');

const router = express.Router();

const Key = require('../../models/Key');

router.post('/', async (req, res) => {
  let keyVal;
  let val;
  // Time to UTC
  const utcDate = moment.utc().toDate();

  // Repair {Key: mykey, values: [value: value, timestamp: timestamp]}
  for (const [mykey, value] of Object.entries(req.body)) {
    keyVal = mykey;
    val = value;
  }
  const Obj = {
    key: keyVal,
    values: [],
  };

  const valObj = { value: val, timestamp: utcDate };
  Obj.values.push(valObj);

  // Format Current Time to AM/PM
  const formatAMPM = date => {
    var hours = date.getUTCHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  try {
    let key = await Key.findOne({ key: Obj.key });
    if (key) {
      key.values.push(valObj);

      key = await Key.findOneAndUpdate(
        { key: Obj.key },
        { $set: key },
        { new: true }
      );
      return res.json({
        key: key.key,
        value: key.values.slice(-1)[0].value,
        timestamp: formatAMPM(key.values.slice(-1)[0].timestamp),
      });
    }
    const Data = new Key(Obj);
    const newKey = await Data.save();

    return res.json({
      key: newKey.key,
      value: newKey.values[0].value,
      timestamp: formatAMPM(newKey.values[0].timestamp),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:key', async (req, res) => {
  const time = req.query.timestamp;
  const validatorTime = /^\d{10}$/;

  try {
    const obj = await Key.findOne({ key: req.params.key });

    // Return if not found obj
    if (!obj) {
      return res.status(404).json({ msg: 'Object not found!' });
    }

    // Validator if correct time format
    if (time && validatorTime.test(time)) {
      const v = obj.values.filter(val => {
        return Number(time) === Math.floor(val.timestamp.getTime() / 1000);
      });
      return res.json({ value: v[0].value });
    }

    return res.json({ value: obj.values.slice(-1)[0].value });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
