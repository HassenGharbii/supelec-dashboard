from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors
from pythonping import ping

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def ping_ip(ip, attempts=4):
    response = ping(ip, count=attempts, timeout=1)

    success_count = sum(1 for result in response if result.success)
    packet_loss = (1 - (success_count / attempts)) * 100
    success_percentage = (success_count / attempts) * 100

    min_rtt = min(result.time_elapsed_ms for result in response) if success_count > 0 else None
    max_rtt = max(result.time_elapsed_ms for result in response) if success_count > 0 else None
    avg_rtt = sum(result.time_elapsed_ms for result in response) / success_count if success_count > 0 else None

    return {
        'success_percentage': success_percentage,
        'packet_loss': packet_loss,
        'min_rtt_ms': min_rtt,
        'max_rtt_ms': max_rtt,
        'avg_rtt_ms': avg_rtt
    }

@app.route('/ping', methods=['POST'])
def ping_ips():
    data = request.json
    ip_addresses = data.get('ips', [])

    if not ip_addresses:
        return jsonify({"error": "No IP addresses provided"}), 400

    results = {}
    for ip in ip_addresses:
        try:
            ping_result = ping_ip(ip)
            results[ip] = ping_result
        except Exception as e:
            results[ip] = {"error": str(e)}

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
