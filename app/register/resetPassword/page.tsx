"use client";

import { BaseSyntheticEvent, useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [res, setRes] = useState(false);
  const [password, setPassword] = useState("");

  async function verifyEmail(event: BaseSyntheticEvent) {
    event.preventDefault();

    const res = await fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application.json" },
      body: JSON.stringify(email),
    });

    setRes(true);
  }

  async function newPassword(event: BaseSyntheticEvent) {
    event.preventDefault();

    const res = await fetch("api/users");
  }

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
              setEmail(event.target.value)
            }
            placeholder="New password"
            className="input input-bordered "
          />
          <button
            onClick={(event) => newPassword(event)}
            className="btn bg-primary"
          ></button>
        </>
      )}
    </div>
  );
}
