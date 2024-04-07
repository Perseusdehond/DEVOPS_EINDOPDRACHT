const { consumeMessageFromQueue } = require('../common-modules/messageQueueService');
const queueNames = require('../common-modules/messageQueueNames');
const Target = require('../models/target');

// This callback function will process messages received from the queue.
async function targetInDb(message) {
    try {
        const targetData = JSON.parse(message);

        const newTarget = new Target({
            _id: targetData._id,
            latitude: targetData.latitude,
            longitude: targetData.longitude,
            location: targetData.location,
            locationDescription: targetData.locationDescription,
            deadline: new Date(targetData.deadline),
            status: targetData.status,
            imageUrl: targetData.imageUrl,
            ownerId: targetData.ownerId,
        });

        // Save the new target to the database
        const savedTarget = await newTarget.save();

        console.log('Target saved successfully:', savedTarget);
    } catch (error) {
        console.error('Error processing message:', error);
    }
}

async function targetUpDb(message) {
    try {
        const targetData = JSON.parse(message);

        const updatedTarget = {
            latitude: targetData.latitude,
            longitude: targetData.longitude,
            locationDescription: targetData.locationDescription,
            deadline: new Date(targetData.deadline),
            status: targetData.status,
            imageUrl: targetData.imageUrl,
            ownerId: targetData.ownerId,
        };

        // Update the target in the database
        const result = await Target.findByIdAndUpdate(targetData._id, updatedTarget);

        console.log('Target updated successfully:', result);
    } catch (error) {
        console.error('Error processing message:', error);
    }
}

async function targetDelDb(message) {
    try {
        const targetData = JSON.parse(message);

        // Delete the target from the database
        const result = await Target.findByIdAndDelete(targetData._id);

        console.log('Target deleted successfully:', result);
    } catch (error) {
        console.error('Error processing message:', error);
    }
}



function start() {
    setInterval(() => {
        consumeMessageFromQueue('targetCreate', targetInDb);
        consumeMessageFromQueue('targetUpdate', targetUpDb);
        consumeMessageFromQueue('targetDelete', targetDelDb);
        console.log('Consuming messages from the queue:', queueNames.targetCreate, queueNames.targetUpdate, queueNames.targetDelete);
    }, 10000);
}

module.exports = { start };