"use client";

import { BaseSyntheticEvent } from "react";

interface Register {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

/* interface FormData {
  name: string;
  email: string;
  password: string;
  confirm: string;
} */

export default function Register() {
  async function handleSubmit(event: BaseSyntheticEvent) {
    event.preventDefault();

    const formData: Register = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application.json" },
      body: JSON.stringify(data),
    });

    console.log(res);
  }
  return (
    <form onSubmit={handleSubmit} className="form-control">
      <label className="label" htmlFor="name">
        Name
      </label>
      <input className="input input-bordered" id="name" name="name" />
      <label className="label" htmlFor="email">
        Email
      </label>
      <input className="input input-bordered" id="email" name="email" />
      <label className="label" htmlFor="password">
        Password
      </label>
      <input className="input input-bordered" id="password" name="password" />
      <label className="label" htmlFor="confirm">
        Confirm password
      </label>
      <input
        className="input input-bordered mb-2"
        id="confirm"
        name="confirm"
      />
      <button className="btn bg-primary">Register</button>
    </form>
  );
}
