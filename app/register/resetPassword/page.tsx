"use client";

import { BaseSyntheticEvent, useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [res, setRes] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  async function verifyEmail(event: BaseSyntheticEvent) {
    event.preventDefault();

    const res = await fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application.json" },
      body: JSON.stringify({ email: email }),
    });

    if (res.ok) {
      setRes(true);
      const data = await res.json();
    }
  }
  /*  async function newPassword(event: BaseSyntheticEvent) {
    event.preventDefault();

    const res = await fetch(`api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application.json" },
      body: JSON.stringify({ password: password }),
    });

    if (res.ok) return console.log("works");
  } */

  return (
    <div className="flex-col justify-center">
      <label className="label ">
        For which Account do you want to reset your Password?
      </label>
      <input
        onChange={(event: BaseSyntheticEvent) => setEmail(event.target.value)}
        placeholder="Your Email"
        className="input input-bordered "
      />
      <button
        onClick={(event) => verifyEmail(event)}
        className="btn bg-primary"
      >
        Submit
      </button>

      {res && (
        <>
          <label className="label ">Enter new password</label>
          <input
            onChange={(event: BaseSyntheticEvent) =>
              setPassword(event.target.value)
            }
            placeholder="New password"
            className="input input-bordered "
          />
          <button
            onClick={(event) => newPassword(event)}
            className="btn bg-primary"
          >
            Change Password
          </button>
        </>
      )}
    </div>
  );
}
