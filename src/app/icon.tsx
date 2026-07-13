import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf3ee",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: "2px solid #c9a24b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5dce4",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#8b2e4e",
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
