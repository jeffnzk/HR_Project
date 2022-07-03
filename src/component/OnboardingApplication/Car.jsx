import React, { useState } from "react";
import store from "../../redux/store";
import Accordion from 'react-bootstrap/Accordion'

export default function Car() {
    return (
        <Accordion.Item eventKey="4">
            <Accordion.Header>Car Information</Accordion.Header>
            <Accordion.Body>
                <label for="brand" class="form-label">Brand</label>
                <input type="text" id="brand" name="brand" class="form-control" value={store.getState().car.brand} disabled={store.getState().applicationStatus === "Pending"} />
                <label for="model" class="form-label">Model</label>
                <input type="text" id="model" name="model" class="form-control" value={store.getState().car.model} disabled={store.getState().applicationStatus === "Pending"} />
                <label for="color" class="form-label">Color</label>
                <input type="text" id="color" name="color" class="form-control" value={store.getState().car.color} disabled={store.getState().applicationStatus === "Pending"} />
            </Accordion.Body>
        </Accordion.Item>
    )
}