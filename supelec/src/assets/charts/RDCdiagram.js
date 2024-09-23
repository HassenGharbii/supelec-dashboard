import React, { useState, useEffect } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "react-flow-renderer";
import { Handle } from "react-flow-renderer";
import axios from "axios";

const switches = [
  { id: "2960X-HM.0.25-Surete-1", ip_address: "172.30.0.16" },
  { id: "2960X-HM.0.25-Surete-2", ip_address: "172.30.0.17" },
  { id: "2960X-VV.0.26-Surete", ip_address: "172.30.0.18" },
  { id: "3850-HM.0.16-Surete", ip_address: "172.30.0.10" },
  { id: "2960X-VV.0.82-Surete", ip_address: "172.30.0.19" },
  { id: "2960X-D5.0.20-Surete", ip_address: "172.30.0.20" },
  { id: "2960X-HM.0.16-Surete", ip_address: "172.30.0.11" },
  { id: "2960X-Z1.S.05-Surete", ip_address: "172.30.0.12" },
  { id: "2960X-F6.1.04-Surete-1", ip_address: "172.30.0.21" },
  { id: "2960X-F6.1.04-Surete-2", ip_address: "172.30.0.22" },
  { id: "2960X-Z2.S.11-Surete-1", ip_address: "172.30.0.13" },


  // Add more switches as needed
];
// Define the rectangles (nodes)
const initialNodes = [
  // floors Bouygues
  {
    id: "Bâtiment Bouygues",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          Bâtiment Bouygues
        </div>
      ),
    },
    position: { x: 1200, y: -10 },
    style: {
      width: 1080,
      height: 1020,
      backgroundColor: "transparent", // Make the background fully transparent
      border: "10px solid #4B5563",
      borderRadius: "10px",
      fontSize: "24px", // Increase the font size
      fontWeight: "bold",
    },
  },
  {
    id: "fibre bouyague",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            fb
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            na
          </div>
          <Handle
            type="target"
            id="15"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "30px",
              left: "1px",
            }}
          />
               <Handle
            type="target"
            id="14"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "50px",
              left: "1px",
            }}
          />
               <Handle
            type="target"
            id="1"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "70px",
              left: "1px",
            }}
          />
                <Handle
            type="source"
            id="16"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "20px",
              left: "30px",
            }}
          />
        </div>
      ),
    },
    position: { x: 1300, y: 850 },
    style: {
      width: 50,
      height: 100,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "3850-Bâtimentaire",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
           3850-Bâtimentaire

          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            172.30.0.1


          </div>
        
               <Handle
            type="target"
            id="1"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "70px",
              left: "1px",
            }}
          />
                  <Handle
            type="target"
            id="2"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "20px",
              left: "1px",
            }}
          />
        </div>
      ),
    },
    position: { x: 1500, y: 720 },
    style: {
      width: 180,
      height: 40,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "3850-Bâtimentaire-2",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
           3850-Bâtimentaire-2

          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            NA

          </div>
        
               <Handle
            type="target"
            id="1"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "70px",
              left: "1px",
            }}
          />
        </div>
      ),
    },
    position: { x: 1500, y: 780 },
    style: {
      width: 180,
      height: 40,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "3850-Bâtimentaire-3",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
           3850-Bâtimentaire-3

          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            NA

          </div>
        
               <Handle
            type="source"
            id="1"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "70px",
              left: "1px",
            }}
          />
        </div>
      ),
    },
    position: { x: 1500, y: 850 },
    style: {
      width: 180,
      height: 40,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "3850-Bâtimentaire-4",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
           3850-Bâtimentaire-4

          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            NA

          </div>
        
               <Handle
            type="target"
            id="1"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "70px",
              left: "1px",
            }}
          />
        </div>
      ),
    },
    position: { x: 1500, y: 910 },
    style: {
      width: 180,
      height: 40,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  
  //floors effel
  {
    id: "Bâtiment Eiffel",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          Bâtiment Eiffel
        </div>
      ),
    },
    position: { x: -50, y: -10 },
    style: {
      width: 1080,
      height: 1020,
      backgroundColor: "transparent", // Make the background fully transparent
      border: "10px solid #4B5563",
      borderRadius: "10px",
      fontSize: "24px", // Increase the font size
      fontWeight: "bold",
    },
  },

  {
    id: "RDC",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically

            fontSize: "18px", // Increase the font size
            fontWeight: "bold", // Optional: Make the text bold
          }}
        >
          RDC
        </div>
      ),
    },
    position: { x: -20, y: 285 },
    style: {
      width: 1000,
      height: 200,
      border: "3px solid #4B5563",
      borderRadius: "10px",
      backgroundColor: "rgba(0, 123, 255, 0.2)",
    },
  },
  {
    id: "RDC - PCs",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            left: "10px",
            fontSize: "18px", // Increase the font size
            fontWeight: "bold", // Optional: Make the text bold
          }}
        >
          RDC - PCs
        </div>
      ),
    },
    position: { x: -20, y: 495 },
    style: {
      width: 1000,
      height: 495,
      backgroundColor: "rgba(128, 0, 128, 0.2)", // Make the background fully transparent
      border: "3px solid #4B5563",
      borderRadius: "10px",
    },
  },
  {
    id: "Sous-Sol",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            left: "10px",
            fontSize: "18px", // Increase the font size
            fontWeight: "bold", // Optional: Make the text bold
          }}
        >
          Sous-Sol
        </div>
      ),
    },
    position: { x: -20, y: 795 },
    style: {
      width: 1000,
      height: 200,
      backgroundColor: "rgba(0, 255, 0, 0.2)", // Make the background fully transparent
      border: "3px solid #4B5563",
      borderRadius: "10px",
    },
  },

  //
  {
    id: "SR F6.1.04",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          SR F6.1.04
        </div>
      ),
    },
    position: { x: 760, y: 130 },
    style: {
      width: 200,
      height: 150,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "3px solid #4B5563",
      borderRadius: "10px",
    },
  },
  // 2 switch
  {
    id: "2960X-F6.1.04-Surete-1",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            2960X-F6.1.04-Surete-1
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            172.30.0.21
          </div>
          <Handle
            type="target"
            position="left"
            id="49"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "130px",
            }}
          />
          <Handle
            type="target"
            position="left"
            id="48"
            style={{
              background: "#555",
              position: "absolute",
              top: "10px",
              left: "100px",
            }}
          />
        </div>
      ),
    },
    position: { x: 780, y: 180 },
    style: {
      width: 150,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "2960X-F6.1.04-Surete-2",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            2960X-F6.1.04-Surete-2
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            172.30.0.22
          </div>
          <Handle
            id="24"
            type="source"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "2px",
              left: "100px",
            }}
          />
        </div>
      ),
    },
    position: { x: 780, y: 240 },
    style: {
      width: 150,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  //RDC

  {
    id: "SR HM.0.25",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          SR VV.0.25
        </div>
      ),
    },
    position: { x: 100, y: 300 },
    style: {
      width: 200,
      height: 150,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "3px solid #4B5563",
      borderRadius: "10px",
    },
  },
  // 2 switchs
  {
    id: "2960X-HM.0.25-Surete-1",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            2960X-HM.0.25-Surete-1
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            172.30.0.16
          </div>
          <Handle
            type="target"
            id="0.25"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "1px",
            }}
          />
        </div>
      ),
    },
    position: { x: 120, y: 350 },
    style: {
      width: 150,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "2960X-HM.0.25-Surete-2",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            2960X-HM.0.25-Surete-2
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            172.30.0.17
          </div>
          <Handle
            type="target"
            position="right"
            id="25"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "100px",
            }}
          />
        </div>
      ),
    },
    position: { x: 120, y: 400 },
    style: {
      width: 150,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "SR HM.0.26",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          SR VV.0.26
        </div>
      ),
    },
    position: { x: 320, y: 300 },
    style: {
      width: 200,
      height: 150,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "3px solid #4B5563",
      borderRadius: "10px",
    },
  },
  //2 switchs
  {
    id: "2960X-VV.0.26-Surete",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            2960X-VV.0.26-Surete
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            172.30.0.18
          </div>
          <Handle
            type="target"
            id="0.25"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "120px",
            }}
          />
        </div>
      ),
    },
    position: { x: 350, y: 350 },
    style: {
      width: 150,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "Switch HPE 0.26",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            Switch HPE
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            N/A
          </div>
          <Handle
            type="source"
            position="left"
            id="25"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "80px",
            }}
          />
          <Handle
            type="source"
            position="left"
            id="25"
            style={{
              background: "#555",
              position: "absolute",
              top: "12px",
              left: "80px",
            }}
          />
        </div>
      ),
    },
    position: { x: 350, y: 400 },
    style: {
      width: 150,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },

  {
    id: "SR VV.0.82",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          SR VV.0.82
        </div>
      ),
    },
    position: { x: 540, y: 300 },
    style: {
      width: 200,
      height: 75,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "3px solid #4B5563",
      borderRadius: "10px",
    },
  },
  //1 switch
  {
    id: "2960X-VV.0.82-Surete",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            2960X-VV.0.82-Surete
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            172.30.0.19
          </div>
          <Handle
            type="target"
            position="left"
            id="0.82"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "1px",
            }}
          />
        </div>
      ),
    },
    position: { x: 570, y: 340 },
    style: {
      width: 150,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "SR D5.0.20",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          SR D5.0.20
        </div>
      ),
    },
    position: { x: 760, y: 300 },
    style: {
      width: 200,
      height: 75,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "3px solid #4B5563",
      borderRadius: "10px",
    },
  },
  //1 SWITCH
  {
    id: "2960X-D5.0.20-Surete",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            2960X-D5.0.20-Surete
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            172.30.0.20
          </div>
          <Handle
            type="source"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "1px",
            }}
          />
          <Handle
            type="target"
            id="25"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "100px",
            }}
          />
        </div>
      ),
    },
    position: { x: 780, y: 340 },
    style: {
      width: 150,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  //RDC-PCs
  {
    id: "CFA HM.0.16",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          CFA HM.0.16
        </div>
      ),
    },
    position: { x: 340, y: 500 },
    style: {
      width: 400,
      height: 250,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "3px solid #4B5563",
      borderRadius: "10px",
    },
  },
  //3 switchs 1 micro
  {
    id: "2960X-HM.0.16-Surete",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            2960X-HM.0.16-Surete
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            172.30.0.11
          </div>
          <Handle
            type="source"
            position="left"
            id="25"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "130px",
            }}
          />
        </div>
      ),
    },
    position: { x: 360, y: 560 },
    style: {
      width: 150,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "Micro Switch",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            Micro Switch
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            n/a
          </div>
          <Handle
            type="source"
            position="left"
            id="4"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "50px",
            }}
          />
          <Handle
            type="target"
            position="left"
            id="1"
            style={{
              background: "#555",

              position: "absolute",
              top: "10px",
              left: "40px",
            }}
          />
          <Handle
            type="target"
            position="left"
            id="3"
            style={{
              background: "#555",

              position: "absolute",
              top: "10px",
              left: "50px",
            }}
          />
          
        </div>
      ),
    },
    position: { x: 520, y: 580 },
    style: {
      width: 80,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "Switch HPE.0.16",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            Switch HPE.0.16
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            n/a
          </div>
          <Handle
            type="target"
            position="left"
            id="25"
            style={{
              background: "#555",

              position: "absolute",
              top: "-2px",
              left: "20px",
            }}
          />
          <Handle
            type="target"
            position="left"
            id="23"
            style={{
              background: "#555",

              position: "absolute",
              top: "5px",
              left: "40px",
            }}
          />
          <Handle
            type="target"
            position="left"
            id="1"
            style={{
              background: "#555",

              position: "absolute",
              top: "8px",
              left: "1px",
            }}
          />
        </div>
      ),
    },
    position: { x: 580, y: 540 },
    style: {
      width: 150,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "3850-HM.0.16-Surete",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            3850-HM.0.16-Surete
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            172.30.0.10
          </div>
          <Handle
            type="source"
            id="3850"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "1px",
            }}
          />
          <Handle
            type="source"
            id="3850-top"
            position="top"
            style={{
              background: "#555",
              position: "absolute",
              top: "1px", // Adjusts how far from the top the handle is placed
              left: "40%", // Centers the handle horizontally
              transform: "translateX(-50%)",
            }}
          />
          <Handle
            type="source"
            id="Gi1/0/7"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "12px", // Adjusts how far from the top the handle is placed
              left: "2%", // Centers the handle horizontally
              transform: "translateX(-50%)",
            }}
          />
          <Handle
            type="source"
            id="Gi1/0/8"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "-1px", // Adjusts how far from the top the handle is placed
              left: "20%", // Centers the handle horizontally
              transform: "translateX(-50%)",
            }}
          />

          <Handle
            type="source"
            id="Gi1/0/11"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "12px", // Adjusts how far from the top the handle is placed
              left: "180px", // Centers the handle horizontally
              transform: "translateX(-50%)",
            }}
          />
          <Handle
            type="source"
            id="Gi1/0/10"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "-1px", // Adjusts how far from the top the handle is placed
              left: "180px", // Centers the handle horizontally
              transform: "translateX(-50%)",
            }}
          />
          <Handle
            type="source"
            id="Gi1/0/17"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "-1px", // Adjusts how far from the top the handle is placed
              left: "125px", // Centers the handle horizontally
              transform: "translateX(-50%)",
            }}
          />
          <Handle
            type="source"
            id="Gi1/0/18"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "-1px", // Adjusts how far from the top the handle is placed
              left: "135px", // Centers the handle horizontally
              transform: "translateX(-50%)",
            }}
          />
          
           <Handle
            type="source"
            id="Gi1/0/4"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "15px", // Adjusts how far from the top the handle is placed
              left: "150px", // Centers the handle horizontally
              transform: "translateX(-50%)",
            }}
          />
           <Handle
            type="source"
            id="Gi1/0/3"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "20px", // Adjusts how far from the top the handle is placed
              left: "160px", // Centers the handle horizontally
              transform: "translateX(-50%)",
            }}
          />
           <Handle
            type="source"
            id="Gi1/0/2"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "20px", // Adjusts how far from the top the handle is placed
              left: "40px", // Centers the handle horizontally
              transform: "translateX(-50%)",
            }}
          />
           <Handle
            type="source"
            id="Gi1/0/1"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "20px", // Adjusts how far from the top the handle is placed
              left: "20px", // Centers the handle horizontally
              transform: "translateX(-50%)",
            }}
          />
            <Handle
            type="source"
            id="Te1/1/4"
            
            style={{
              background: "#555",
              position: "absolute",
              top: "20px", // Adjusts how far from the top the handle is placed
              left: "120px", // Centers the handle horizontally
              transform: "translateX(-50%)",
            }}
          />
            <Handle
            type="source"
            id="Te1/1/3"
            
            style={{
              background: "#555",
              position: "absolute",
              top: "20px", // Adjusts how far from the top the handle is placed
              left: "90px", // Centers the handle horizontally
              transform: "translateX(-50%)",
            }}
          />
            <Handle
            type="source"
            id="13"
            style={{
              background: "#555",
              position: "absolute",
              top: "20px", // Adjusts how far from the top the handle is placed
              left: "60px", // Centers the handle horizontally
              transform: "translateX(-50%)",
            }}
          />
        </div>
      ),
    },
    position: { x: 440, y: 650 },
    style: {
      width: 200,
      height: 40,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "SR Z1.S.05",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          SR Z1.S.05
        </div>
      ),
    },
    position: { x: 100, y: 700 },
    style: {
      width: 200,
      height: 75,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "3px solid #4B5563",
      borderRadius: "10px",
    },
  },
  {
    id: "2960X-Z1.S.05-Surete",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            2960X-Z1.S.05-Surete
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            172.30.0.12
          </div>
          <Handle
            type="target"
            position="left"
            id="25"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "130px",
            }}
          />
        </div>
      ),
    },
    position: { x: 130, y: 735 },
    style: {
      width: 150,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },

  //sous-sol
  {
    id: "2960X-Z2.S.11-Surete-1",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            2960X-Z1.S.05-Surete
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            172.30.0.13
          </div>
          <Handle
            type="target"
            position="left"
            id="49"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "5px",
            }}
          />
          <Handle
            type="source"
            position="left"
            id="48"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "110px",
            }}
          />
        </div>
      ),
    },
    position: { x: 130, y: 835 },
    style: {
      width: 150,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "2960X-Z2.S.11-Surete-2",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            2960X-Z2.S.11-Surete-2
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            172.30.0.23
          </div>
          <Handle
            type="target"
            position="left"
            id="24"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "100px",
            }}
          />
        </div>
      ),
    },
    position: { x: 130, y: 905 },
    style: {
      width: 150,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "SR Z2.S.11",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          SR Z2.S.11
        </div>
      ),
    },
    position: { x: 100, y: 800 },
    style: {
      width: 200,
      height: 150,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "3px solid #4B5563",
      borderRadius: "10px",
    },
  },
  //salle serveur
  {
    id: "Salle serveur",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          Salle serveur
        </div>
      ),
    },
    position: { x: 320, y: 800 },
    style: {
      width: 200,
      height: 150,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "3px solid #4B5563",
      borderRadius: "10px",
    },
  },
  {
    id: "fibre vers salle",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            fibre 
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            NA
          </div>
          <Handle
            id="GTB1/1"
            type="source"
            
            style={{
              background: "#555",
              position: "absolute",
              top: "15px",
              left: "70px",
            }}
          />
              <Handle
            id="GTB1/2"
            type="source"
            
            style={{
              background: "#555",
              position: "absolute",
              top: "15px",
              left: "40px",
            }}
          />
              <Handle
            id="GTB1/3"
            type="source"
            
            style={{
              background: "#555",
              position: "absolute",
              top: "15px",
              left: "10px",
            }}
          />
            <Handle
            id="GTB1"
            type="target"
            
            style={{
              background: "#555",
              position: "absolute",
              top: "1px",
              left: "70px",
            }}
          />
              <Handle
            id="GTB2"
            type="target"
            
            style={{
              background: "#555",
              position: "absolute",
              top: "1px",
              left: "40px",
            }}
          />
              <Handle
            id="4500"
            type="target"
            
            style={{
              background: "#555",
              position: "absolute",
              top: "1px",
              left: "10px",
            }}
          />
        </div>
      ),
    },
    position: { x: 440, y: 740 },
    style: {
      width: 100,
      height: 40,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "CFA HM.0.16",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            CFA HM.0.16
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            NA
          </div>
          <Handle
            id="GTB1/1T"
            type="target"
            
            style={{
              background: "#555",
              position: "absolute",
              top: "2px",
              left: "70px",
            }}
          />
              <Handle
            id="GTB1/2T"
            type="target"
            
            style={{
              background: "#555",
              position: "absolute",
              top: "2px",
              left: "40px",
            }}
          />
              <Handle
            id="GTB1/3T"
            type="target"
            
            style={{
              background: "#555",
              position: "absolute",
              top: "2px",
              left: "10px",
            }}
          />
                   <Handle
            id="15"
            type="source"
            
            style={{
              background: "#555",
              position: "absolute",
              top: "15px",
              left: "70px",
            }}
          />
              <Handle
            id="14"
            type="source"
            
            style={{
              background: "#555",
              position: "absolute",
              top: "15px",
              left: "40px",
            }}
          />
              <Handle
            id="1"
            type="source"
            
            style={{
              background: "#555",
              position: "absolute",
              top: "15px",
              left: "10px",
            }}
          />
        </div>
      ),
    },
    position: { x: 360, y: 840 },
    style: {
      width: 100,
      height: 40,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "CFA HM.0.16-1",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            CFA HM.0.16-1
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            NA
          </div>
          <Handle
            id="15"
            type="target"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "1px",
              left: "60px",
            }}
          />
           <Handle
            id="14"
            type="target"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "1px",
              left: "40px",
            }}
          />
               <Handle
            id="1"
            type="target"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "1px",
              left: "10px",
            }}
          />
                 <Handle
            id="P-1"
            type="source"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "1px",
              left: "80px",
            }}
          />
           <Handle
            id="P-2"
            type="source"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "11px",
              left: "80px",
            }}
          />
               <Handle
            id="P-3"
            type="source"
            position="left"
            style={{
              background: "#555",
              position: "absolute",
              top: "22px",
              left: "80px",
            }}
          />
        </div>
      ),
    },
    position: { x: 360, y: 900 },
    style: {
      width: 100,
      height: 40,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "SR Z3.S.24",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          SR Z3.S.24
        </div>
      ),
    },
    position: { x: 540, y: 800 },
    style: {
      width: 200,
      height: 75,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "3px solid #4B5563",
      borderRadius: "10px",
    },
  },
  {
    id: "SR Z4.S.24",
    data: {
      label: (
        <div
          style={{
            color: "white",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          SR Z4.S.24
        </div>
      ),
    },
    position: { x: 760, y: 800 },
    style: {
      width: 200,
      height: 75,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "3px solid #4B5563",
      borderRadius: "10px",
    },
  },
  {
    id: "2960X-Z3.S.24-Surete",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            2960X-Z3.S.24-Surete
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            172.30.0.14
          </div>

          <Handle
            type="target"
            position="left"
            id="25"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "110px",
            }}
          />
        </div>
      ),
    },
    position: { x: 580, y: 835 },
    style: {
      width: 150,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
  {
    id: "2960X-Z4.S.06-Surete",
    data: {
      label: (
        <div style={{ color: "white", position: "relative" }}>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "bold",
              position: "absolute",
              top: "-30px",
              left: "30px",
            }}
          >
            2960X-Z4.S.06-Surete
          </div>
          <div
            style={{
              fontSize: "6px",
              position: "absolute",
              top: "-20px",
              left: "30px",
            }}
          >
            172.30.0.15
          </div>

          <Handle
            type="target"
            position="left"
            id="25"
            style={{
              background: "#555",
              position: "absolute",
              top: "50%",
              left: "110px",
            }}
          />
        </div>
      ),
    },
    position: { x: 780, y: 835 },
    style: {
      width: 150,
      height: 20,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "2px solid #EF4444",
      borderRadius: "10px",
    },
    connectable: false,
  },
];
const edges = [
  //3850-HM.0.16-Surete

  {
    id: "e1-2",
    source: "3850-HM.0.16-Surete",
    target: "2960X-HM.0.25-Surete-1",
    sourceHandle: "3850", // Connect from handle 'a' of source node 1
    targetHandle: "0.25",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "e2-2",
    source: "3850-HM.0.16-Surete",
    target: "2960X-VV.0.82-Surete",
    sourceHandle: "3850-top", // Connect from handle 'a' of source node 1
    targetHandle: "0.82",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "e2-3",
    source: "3850-HM.0.16-Surete",
    target: "2960X-HM.0.25-Surete-2",
    sourceHandle: "Gi1/0/7", // Connect from handle 'a' of source node 1
    targetHandle: "25",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "e2-4",
    source: "3850-HM.0.16-Surete",
    target: "2960X-VV.0.26-Surete",
    sourceHandle: "Gi1/0/8", // Connect from handle 'a' of source node 1
    targetHandle: "0.25",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "e2-5",
    source: "3850-HM.0.16-Surete",
    target: "2960X-F6.1.04-Surete-1",
    sourceHandle: "Gi1/0/11", // Connect from handle 'a' of source node 1
    targetHandle: "49",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "e2-6",
    source: "3850-HM.0.16-Surete",
    target: "2960X-D5.0.20-Surete",
    sourceHandle: "Gi1/0/10", // Connect from handle 'a' of source node 1
    targetHandle: "25",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "e-10",
    source: "3850-HM.0.16-Surete",
    target: "Micro Switch",
    sourceHandle: "Gi1/0/17", // Connect from handle 'a' of source node 1
    targetHandle: "1",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "e-11",
    source: "3850-HM.0.16-Surete",
    target: "Micro Switch",
    sourceHandle: "Gi1/0/18", // Connect from handle 'a' of source node 1
    targetHandle: "3",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "Z-20",
    source: "3850-HM.0.16-Surete",
    target: "2960X-Z3.S.24-Surete",
    sourceHandle: "Gi1/0/4", // Connect from handle 'a' of source node 1
    targetHandle: "25",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "Z-20",
    source: "3850-HM.0.16-Surete",
    target: "2960X-Z4.S.06-Surete",
    sourceHandle: "Gi1/0/3", // Connect from handle 'a' of source node 1
    targetHandle: "25",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  //
  {
    id: "hpe26-hpe25",
    source: "Switch HPE.0.16",
    target: "",
    sourceHandle: "23", // Connect from handle 'a' of source node 1
    targetHandle: "25",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "e2-6",
    source: "2960X-F6.1.04-Surete-1",
    target: "2960X-F6.1.04-Surete-2",
    sourceHandle: "48", // Connect from handle 'a' of source node 1
    targetHandle: "24",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "e2s-6",
    source: "3850-HM.0.16-Surete",
    target: "2960X-Z2.S.11-Surete-1",
    sourceHandle: "Gi1/0/1", // Connect from handle 'a' of source node 1
    targetHandle: "49",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 1 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "e2s-7",
    source: "3850-HM.0.16-Surete",
    target: "2960X-Z1.S.05-Surete",
    sourceHandle: "Gi1/0/2", // Connect from handle 'a' of source node 1
    targetHandle: "25",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  //
  {
    id: "hpe16-MS",
    source: "Micro Switch",
    target: "Switch HPE.0.16",
    sourceHandle: "4", // Connect from handle 'a' of source node 1
    targetHandle: "23",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "hpe17-MS",
    source: "Switch HPE 0.26",
    target: "Switch HPE.0.16",
    sourceHandle: "25", // Connect from handle 'a' of source node 1
    targetHandle: "25",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "hpe19-MS",
    source: "2960X-HM.0.16-Surete",
    target: "Switch HPE.0.16",
    sourceHandle: "25", // Connect from handle 'a' of source node 1
    targetHandle: "1",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "hpe19-MzzS",
    source: "2960X-Z2.S.11-Surete-1",
    target: "2960X-Z2.S.11-Surete-2",
    sourceHandle: "48", // Connect from handle 'a' of source node 1
    targetHandle: "24",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "f-1",
    source: "3850-HM.0.16-Surete",
    target: "fibre vers salle",
    sourceHandle: "Te1/1/4", // Connect from handle 'a' of source node 1
    targetHandle: "GTB1",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "f-2",
    source: "3850-HM.0.16-Surete",
    target: "fibre vers salle",
    sourceHandle: "Te1/1/3", // Connect from handle 'a' of source node 1
    targetHandle: "GTB2",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "f-3",
    source: "3850-HM.0.16-Surete",
    target: "fibre vers salle",
    sourceHandle: "13", // Connect from handle 'a' of source node 1
    targetHandle: "4500",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },

  {
    id: "f2-1",
    source: "fibre vers salle",
    target: "CFA HM.0.16",
    sourceHandle: "GTB1/1", // Connect from handle 'a' of source node 1
    targetHandle: "GTB1/1T",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "f2-2",
    source: "fibre vers salle",
    target: "CFA HM.0.16",
    sourceHandle: "GTB1/2", // Connect from handle 'a' of source node 1
    targetHandle: "GTB1/2T",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "f2-3",
    source: "fibre vers salle",
    target: "CFA HM.0.16",
    sourceHandle: "GTB1/3", // Connect from handle 'a' of source node 1
    targetHandle: "GTB1/3T",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },

  {
    id: "f3-1",
    source: "CFA HM.0.16",
    target: "CFA HM.0.16-1",
    sourceHandle: "15", // Connect from handle 'a' of source node 1
    targetHandle: "15",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "f3-2",
    source: "CFA HM.0.16",
    target: "CFA HM.0.16-1",
    sourceHandle: "14", // Connect from handle 'a' of source node 1
    targetHandle: "14",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "f3-3",
    source: "CFA HM.0.16",
    target: "CFA HM.0.16-1",
    sourceHandle: "1", // Connect from handle 'a' of source node 1
    targetHandle: "1",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "f4-1",
    source: "CFA HM.0.16-1",
    target: "fibre bouyague",
    sourceHandle: "P-1", // Connect from handle 'a' of source node 1
    targetHandle: "15",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "f4-2",
    source: "CFA HM.0.16-1",
    target: "fibre bouyague",
    sourceHandle: "P-2", // Connect from handle 'a' of source node 1
    targetHandle: "14",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "f4-3",
    source: "CFA HM.0.16-1",
    target: "fibre bouyague",
    sourceHandle: "P-3", // Connect from handle 'a' of source node 1
    targetHandle: "1",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "f5-1",
    source: "fibre bouyague",
    target: "3850-Bâtimentaire-2",
    sourceHandle: "16", // Connect from handle 'a' of source node 1
    targetHandle: "1",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },
  {
    id: "f5-1",
    source: "3850-Bâtimentaire-3",
    target: "3850-Bâtimentaire",
    sourceHandle: "1", // Connect from handle 'a' of source node 1
    targetHandle: "2",
    type: "step", // Set the edge type to 'step' for 90-degree angles
    animated: true,
    style: { stroke: "green", strokeWidth: 4 }, // Connect to handle 'b' of target node 2
  },



];

const RDCDiagram = ({ switchers }) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edgesState, setEdgesState] = useState(edges);

  useEffect(() => {
    // Step 1: Create a map of switch statuses
    const nodeStatusMap = {};
    switches.forEach((switchNode) => {
      const pingData = switchers.find(
        (host) => host.ip_address.trim() === switchNode.ip_address.trim()
      );
      nodeStatusMap[switchNode.id] = pingData
        ? Number(pingData.success_percentage) === 100
        : false; // Assume offline if no data
    });

    // Step 2: Update only the nodes that are in the switches list
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        // Only update the node if its ID is in the switches list
        if (nodeStatusMap.hasOwnProperty(node.id)) {
          const isOnline = nodeStatusMap[node.id];
          const newColor = isOnline
            ? "rgba(0, 255, 0, 0.5)"
            : "rgba(255, 0, 0, 0.5)";
          return {
            ...node,
            style: {
              ...node.style,
              backgroundColor: newColor,
            },
          };
        }
        // Return the node unchanged if it's not in the switches list
        return node;
      })
    );

    // Step 3: Update edge colors based on connected nodes' statuses
    setEdgesState((prevEdges) =>
      prevEdges.map((edge) => {
        const sourceStatus = nodeStatusMap[edge.source];
        const targetStatus = nodeStatusMap[edge.target];
        const edgeColor = sourceStatus && targetStatus ? "green" : "red";
        return {
          ...edge,
          style: {
            stroke: edgeColor,
            strokeWidth: 4,
          },
        };
      })
    );
  }, [switchers]);

  return (
    <div
      className="network-diagram-container"
      style={{
        height: "600px",
        width: "100%",
        padding: "20px",
        background: "#1F2937",
      }}
    >
      <ReactFlow nodes={nodes} edges={edgesState} fitView>
        <MiniMap nodeColor={() => "#1E293B"} />

        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default RDCDiagram;
